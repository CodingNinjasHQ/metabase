import styled from "@emotion/styled";
import type { Theme } from "@emotion/react";
import { css } from "@emotion/react";
import { color } from "metabase/ui/utils/colors";
import { Icon } from "metabase/ui";
import ExternalLink from "metabase/core/components/ExternalLink";

const getCardRootStyle = (theme: Theme) => css`
  display: block;
  padding: 1.5rem;
  border: 1px solid ${theme.fn.themeColor("border")};
  border-radius: 0.375rem;
  background-color: ${theme.fn.themeColor("white")};
  box-shadow: 0 1px 6px ${theme.fn.themeColor("shadow")};
  box-sizing: border-box;
`;

const CardHeaderMixin = css`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

export const CardRootStatic = styled.div`
  ${({ theme }) => getCardRootStyle(theme)};
`;

export const CardRootLink = styled(ExternalLink)`
  ${({ theme }) => getCardRootStyle(theme)};

  &:hover {
    background-color: ${color("bg-light")};
  }
`;

export const CardHeaderStatic = styled.div`
  ${CardHeaderMixin};
`;

export const CardHeaderLink = styled(ExternalLink)`
  ${CardHeaderMixin};
`;

export const CardTitle = styled.span`
  display: block;
  flex: 1 1 auto;
  color: ${color("brand")};
  font-weight: bold;
  margin: 0 0.5rem;
`;

export const CardIcon = styled(Icon)`
  flex: 0 0 auto;
  color: ${color("brand")};
`;

export const CardMessage = styled.div`
  display: block;
  color: ${color("text-medium")};
  line-height: 1.25rem;

  p {
    margin: 0;
  }

  p:not(:last-child) {
    margin-bottom: 1.25rem;
  }

  a {
    color: ${color("brand")};
    cursor: pointer;
    font-weight: bold;
  }
`;
