import styled from "@emotion/styled";
import { css } from "@emotion/react";
import AutosizeTextarea from "react-textarea-autosize";
import { color } from "metabase/ui/utils/colors";

export interface TextPickerInputProps {
  hasInvalidValues: boolean;
}

export const TextPickerInput = styled.input<TextPickerInputProps>`
  border-color: ${color("filter")};

  ${({ hasInvalidValues, theme }) =>
    hasInvalidValues &&
    css`
      border-color: ${theme.fn.themeColor("error")};
    `}
`;

export interface TextPickerAreaProps {
  hasInvalidValues: boolean;
}

export const TextPickerArea = styled(AutosizeTextarea)<TextPickerAreaProps>`
  border-color: ${color("filter")};

  ${({ hasInvalidValues, theme }) =>
    hasInvalidValues &&
    css`
      border-color: ${theme.fn.themeColor("error")};
    `}
`;
