(ns metabase-enterprise.advanced-permissions.api.general-test
  (:require [clojure.test :refer :all]
            [metabase.models :refer [PermissionsGroup]]
            [metabase.models.permissions-group :as group]
            [metabase.public-settings.premium-features-test :as premium-features-test]
            [metabase.test :as mt]
            [toucan.db :as db]))

(deftest general-permissions-test
  (mt/with-temp* [PermissionsGroup [{group-id :id}]]
    (testing "GET /api/ee/advanced-permissions/general/graph"
      (testing "Should require a token with `:advanced-permissions`"
        (premium-features-test/with-premium-features #{}
          (is (= "This API endpoint is only enabled if you have a premium token with the :advanced-permissions feature."
                 (mt/user-http-request :crowberto :get 402 "ee/advanced-permissions/general/graph")))))

      (testing "have to be a superuser"
        (is (= "You don't have permissions to do that."
               (mt/user-http-request :rasta :get 403 "ee/advanced-permissions/general/graph"))))

      (testing "return general permissions for all groups"
        (let [graph  (mt/user-http-request :crowberto :get 200 "ee/advanced-permissions/general/graph")
              groups (:groups graph)]
          (is (int? (:revision graph)))
          (is (= (set (map mt/int->kw (db/select-field :id PermissionsGroup)))
                 (set (keys groups))))
          (is (partial= {(mt/int->kw (:id (group/admin)))
                         {:monitoring   "yes"
                          :setting      "yes"
                          :subscription "yes"}
                         (mt/int->kw group-id)
                         {:monitoring   "no"
                          :setting      "no"
                          :subscription "no"}}
                        groups)))))

    (testing "PUT /api/ee/advanced-permissions/general/graph"
      (let [current-graph (mt/user-http-request :crowberto :get 200 "ee/advanced-permissions/general/graph")
            new-graph     (assoc-in current-graph [:groups (mt/int->kw group-id) :setting] "yes")]
        (testing "Should require a token with `:advanced-permissions`"
          (premium-features-test/with-premium-features #{}
            (is (= "This API endpoint is only enabled if you have a premium token with the :advanced-permissions feature."
                   (mt/user-http-request :crowberto :put 402 "ee/advanced-permissions/general/graph" new-graph)))))

        (testing "have to be a superuser"
          (is (= "You don't have permissions to do that."
                 (mt/user-http-request :rasta :put 403 "ee/advanced-permissions/general/graph" new-graph))))

        (testing "failed when revision is mismatched"
          (is (= "Looks like someone else edited the permissions and your data is out of date. Please fetch new data and try again."
                 (mt/user-http-request :crowberto :put 409 "ee/advanced-permissions/general/graph"
                                       (assoc new-graph :revision (inc (:revision new-graph)))))))

        (testing "successfully update general permissions"
          (is (partial= {(mt/int->kw (:id (group/admin)))
                         {:monitoring   "yes"
                          :setting      "yes"
                          :subscription "yes"}
                         (mt/int->kw group-id)
                         {:monitoring   "no"
                          :setting      "yes"
                          :subscription "no"}}
                        (:groups (mt/user-http-request :crowberto :put 200 "ee/advanced-permissions/general/graph" new-graph)))))))))
