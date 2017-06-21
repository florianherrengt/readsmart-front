// @flow
import React from "react";
import FontAwesome from "react-fontawesome";
import { Button, ListGroup, ListGroupItem } from "react-bootstrap";
import { GroupItem } from "./Item";

import type { SideMenuItem } from "./index";

export type GroupProps = {
  name: string,
  expanded?: boolean,
  items: SideMenuItem[]
};

export class Group extends React.Component {
  state: { expanded?: boolean };
  constructor(props: GroupProps) {
    super(props);
    this.state = { expanded: props.expanded || true };
  }
  render() {
    const { expanded } = this.state;
    return (
      <ListGroup className="group">
        <ListGroupItem>
          <Button
            className="group-name"
            onClick={() => this.setState({ expanded: !expanded })}
          >
            <FontAwesome name={expanded ? "caret-down" : "caret-right"} />
            {this.props.name}
          </Button>
        </ListGroupItem>
        {expanded &&
          <div className="group-items">
            {this.props.items.map((itemProps, index) =>
              <GroupItem
                groupName={this.props.name}
                key={index}
                {...itemProps}
              />
            )}
          </div>}
      </ListGroup>
    );
  }
}
