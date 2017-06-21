// @flow
import React from "react";
import { Button, ListGroup, ListGroupItem } from "react-bootstrap";
import { Link } from "react-router-dom";
import FontAwesome from "react-fontawesome";
import "./styles.css";
import { Group } from "./Group";
import { graphql, gql } from "react-apollo";
import _ from "lodash";
import { allSourcesQuery } from "../../graphql/source";

export type SideMenuItem = {
  name: string
};

export type SideMenuProps = {
  onItemClick?: Function,
  groups: string[],
  items: SideMenuItem[][],
  children?: any,
  history?: any
};

export const SideMenu = (props: SideMenuProps) => {
  console.log(props);
  return (
    <div className="side-menu">
      <div className="side-menu-list">
        <div className="title text-center">ReadSmart</div>
        <ListGroup>
          <ListGroupItem>
            <Button><FontAwesome name="check" />Saved</Button>
          </ListGroupItem>
          <ListGroupItem>
            <Button><FontAwesome name="share" />Shared</Button>
          </ListGroupItem>
        </ListGroup>
        {props.groups.map((groupName, index) =>
          <Group key={index} name={groupName} items={props.items[index]} />
        )}
      </div>
      <ListGroup className="bottom-actions">
        <ListGroupItem>
          <Link to="/addsource">
            <Button><FontAwesome name="plus" />Add source</Button>
          </Link>
        </ListGroupItem>
      </ListGroup>
    </div>
  );
};

export const SideMenuWithData = graphql(allSourcesQuery)(props => {
  const { data: { loading, allSources } } = props;
  const emptyItems = [{ name: "" }, { name: "" }, { name: "" }];
  if (loading) {
    return (
      <SideMenu
        {...props}
        groups={["", "", ""]}
        items={[emptyItems, emptyItems, emptyItems]}
      />
    );
  }
  const { sources } = allSources;
  const groups = Object.keys(_.groupBy(sources, "type"));
  const items = groups.map(key =>
    sources.filter(source => source.type === key)
  );
  console.log({ groups, items });
  return <SideMenu {...props} groups={groups} items={items} />;
});
