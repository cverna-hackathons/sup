import React from 'react';
import { connect } from 'react-redux';
import { State } from '../store/store';
import { fetchUsers } from '../store/actions/UsersActions';
import { User } from '../store/reducers/UsersReducer';

interface Props {
  users: User[];
  fetchUsers(): void;
}

class UserListView extends React.PureComponent<Props> {
  componentDidMount() {
    this.props.fetchUsers();
  }

  renderUser(user: User) {
    return (
      <div>
        {user.id} - {user.first_name} {user.last_name} - {user.email}
      </div>
    );
  }
  render() {
    return (
      <>
        <h1>User list</h1>
        {this.props.users.map(this.renderUser)}
      </>
    );
  }
}

function mapStateToProps(state: State) {
  return {
    users: state.users.data,
  };
}

const mapDispatchToProps = {
  fetchUsers,
};

export const UserListContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserListView);
