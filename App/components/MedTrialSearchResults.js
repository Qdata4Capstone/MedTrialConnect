import React, { Component } from "react";
import { Container, Content, Text, Spinner, List, ListItem } from "native-base";
import { Actions } from "react-native-router-flux";
import { serverUrl } from "../config";

export default class TrialSearchResults extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      searchResults: [],
    };
  }

  componentDidMount() {
    return fetch(serverUrl+'?query=' + this.props.searchInput, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          searchResults: responseJson.search_results,
        }, function () {
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <Container>
          <Content>
            <Spinner color="blue" />
          </Content>
        </Container>
      )
    }
    return (
      <Container>
        <Content padder>
          <List>
            {
              this.state.searchResults.map(trial =>
                <ListItem key={trial.nct_id} onPress={() => Actions.TrialView({ trial: trial, searchInput: this.props.searchInput })}>
                  <Text>{trial.brief_title}</Text>
                </ListItem>
              )
            }
          </List>
        </Content>
      </Container>
    );
  }
}