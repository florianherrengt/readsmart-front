// @flow
import React from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import loremIpsum from "lorem-ipsum";

import { CardList } from "../components/Card/CardList";
import type { CardProps } from "../components/Card";

export function generateCardProps(isLoading?: boolean): CardProps[] {
  const generatedProps = [];
  for (let i = 0; i < 10; i++) {
    const props: CardProps = {
      title: loremIpsum({ count: 1 }),
      text: loremIpsum({ count: 5 }),
      isLoading
    };
    generatedProps.push(props);
  }
  return generatedProps;
}

storiesOf("CardList", module)
  .add("with title and text", () =>
    <CardList subscribeToMorePost={action} cards={generateCardProps()} />
  )
  .add("with loading true", () =>
    <CardList subscribeToMorePost={action} isLoading />
  );
