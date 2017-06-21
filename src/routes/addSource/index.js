import React from "react";
import { graphql, compose } from "react-apollo";
import { AddSource, getSourceType } from "../../components/AddSource";
import { apolloClient } from "../../App";
import { redditPostsQuery } from "../../graphql/posts";
import type { CardProps } from "../../components/Card";
import { addSourceMutation, allSourcesQuery } from "../../graphql/source";
import { Router } from "react-router-dom";

export class AddSourceRoute extends React.Component {
  state: {
    loading: boolean,
    cards?: CardProps[]
  };
  constructor(props) {
    super(props);
    this.state = {};
    console.log(this);
  }
  async _getRedditData(sub) {
    this.setState({ loading: true });
    const { data: { redditPosts } } = await apolloClient.query({
      query: redditPostsQuery,
      variables: { sub }
    });
    const cards: CardProps[] = redditPosts.posts;
    this.setState({ cards, loading: false });
  }
  _onUrlChange = (url: string) => {
    const { type, sub } = getSourceType(url);
    if (type === "reddit") {
      this.setState({ title: sub, sub });
      return this._getRedditData(sub);
    }
  };
  _onSave = async (variables: { type: string, url: string, name: string }) => {
    await this.props.mutate({
      variables,
      refetchQueries: [{ query: allSourcesQuery }]
    });
    this.props.history.replace(
      `/source/${variables.type}/item/${variables.name}`
    );
  };
  render() {
    const { loading } = this.state;
    return (
      <AddSource
        title={this.state.title}
        isLoading={loading}
        cards={this.state.cards}
        sub={this.state.sub}
        subscribeToMorePost={() => {}}
        onUrlChange={this._onUrlChange}
        onSave={this._onSave}
      />
    );
  }
}

export const AddSourceWithData = graphql(addSourceMutation)(AddSourceRoute);
