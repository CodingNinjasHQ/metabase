import styled from "@emotion/styled";
import { css } from "@emotion/react";
import Card from "metabase/components/Card";

export interface SlackCardProps {
  isConfigured: boolean;
}

export const ChannelCard = styled(Card)<SlackCardProps>`
  ${({ isConfigured, theme }) =>
    isConfigured &&
    css`
      cursor: pointer;

      &:hover {
        color: ${theme.fn.themeColor("white")};
        background-color: ${theme.fn.themeColor("brand")};
      }
    `}
`;
