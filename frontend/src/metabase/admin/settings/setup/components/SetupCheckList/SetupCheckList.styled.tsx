import { Link } from "react-router";
import styled from "@emotion/styled";
import type { Theme } from "@emotion/react";
import { css } from "@emotion/react";
import ExternalLink from "metabase/core/components/ExternalLink";

export const SetupListRoot = styled.div`
  display: flex;
  justify-content: space-between;
`;

const getLinkStyles = (theme: Theme) => css`
  display: flex;
  align-items: center;
  padding: 1rem;
  border: 1px solid ${theme.fn.themeColor("border")};
  border-radius: 0.5rem;
  transition: border 0.3s linear;
  text-decoration: none;

  &:hover {
    border-color: ${theme.fn.themeColor("brand")};
  }
`;

export const TaskRegularLink = styled(Link)`
  ${({ theme }) => getLinkStyles(theme)}
`;

export const TaskExternalLink = styled(ExternalLink)`
  ${({ theme }) => getLinkStyles(theme)}
`;
