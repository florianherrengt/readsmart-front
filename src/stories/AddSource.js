// @flow
import React from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import { AddSource } from "../components/AddSource";
import { generateCardProps } from "./CardList";
storiesOf("AddSource", module)
  .add("with no value", () =>
    <div>
      <AddSource
        onSave={action("onSave")}
        subscribeToMorePost={action("more post")}
        onUrlChange={action("onUrlChange")}
      />
    </div>
  )
  .add("with loading", () =>
    <div>
      <AddSource
        onSave={action("onSave")}
        subscribeToMorePost={action("more post")}
        onUrlChange={action("onUrlChange")}
        url="http://myurl.com"
        isLoading
      />
    </div>
  )
  .add("with invalid url", () =>
    <div>
      <AddSource
        onSave={action("onSave")}
        subscribeToMorePost={action("more post")}
        onUrlChange={action("onUrlChange")}
        url="invalid url"
      />
    </div>
  )
  .add("with valid reddit url", () =>
    <div>
      <AddSource
        onSave={action("onSave")}
        subscribeToMorePost={action("more post")}
        onUrlChange={action("onUrlChange")}
        url="http://myurl.com"
        type="reddit"
        title="Javascript"
        cards={generateCardProps()}
      />
    </div>
  )
  .add("with valid hacknews url", () =>
    <div>
      <AddSource
        onSave={action("onSave")}
        subscribeToMorePost={action("more post")}
        onUrlChange={action("onUrlChange")}
        url="http://myurl.com"
        type="hackernews"
        title="Hackernews"
        cards={generateCardProps()}
      />
    </div>
  )
  .add("with valid medium url", () =>
    <div>
      <AddSource
        onSave={action("onSave")}
        subscribeToMorePost={action("more post")}
        onUrlChange={action("onUrlChange")}
        url="http://myurl.com"
        type="medium"
        title="Free Code Camp"
        cards={generateCardProps()}
      />
    </div>
  )
  .add("with valid rss url", () =>
    <div>
      <AddSource
        onSave={action("onSave")}
        subscribeToMorePost={action("more post")}
        onUrlChange={action("onUrlChange")}
        url="http://myurl.com"
        type="rss"
        title="My RSS Feed"
        cards={generateCardProps()}
      />
    </div>
  );
