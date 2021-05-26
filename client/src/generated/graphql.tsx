import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A location in a connection that can be used for resuming pagination. */
  Cursor: any;
  /**
   * A point in time as described by the [ISO
   * 8601](https://en.wikipedia.org/wiki/ISO_8601) standard. May or may not include a timezone.
   */
  Datetime: any;
  /**
   * A JSON Web Token defined by [RFC 7519](https://tools.ietf.org/html/rfc7519)
   * which securely represents claims between two parties.
   */
  JwtToken: any;
  /** A universally unique identifier as defined by [RFC 4122](https://tools.ietf.org/html/rfc4122). */
  UUID: any;
};

/** All input for the `authenticateAdmin` mutation. */
export type AuthenticateAdminInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  password: Scalars['String'];
};

/** The output of our `authenticateAdmin` mutation. */
export type AuthenticateAdminPayload = {
  __typename?: 'AuthenticateAdminPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  jwtToken?: Maybe<Scalars['JwtToken']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};

/** All input for the `authenticate` mutation. */
export type AuthenticateInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  password: Scalars['String'];
};

/** The output of our `authenticate` mutation. */
export type AuthenticatePayload = {
  __typename?: 'AuthenticatePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  jwtToken?: Maybe<Scalars['JwtToken']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};

/** A filter to be used against Boolean fields. All fields are combined with a logical ‘and.’ */
export type BooleanFilter = {
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: Maybe<Scalars['Boolean']>;
  /** Equal to the specified value. */
  equalTo?: Maybe<Scalars['Boolean']>;
  /** Not equal to the specified value. */
  notEqualTo?: Maybe<Scalars['Boolean']>;
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: Maybe<Scalars['Boolean']>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: Maybe<Scalars['Boolean']>;
  /** Included in the specified list. */
  in?: Maybe<Array<Scalars['Boolean']>>;
  /** Not included in the specified list. */
  notIn?: Maybe<Array<Scalars['Boolean']>>;
  /** Less than the specified value. */
  lessThan?: Maybe<Scalars['Boolean']>;
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: Maybe<Scalars['Boolean']>;
  /** Greater than the specified value. */
  greaterThan?: Maybe<Scalars['Boolean']>;
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: Maybe<Scalars['Boolean']>;
};

export type Class = Node & {
  __typename?: 'Class';
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  classId: Scalars['UUID'];
  courseNumber?: Maybe<Scalars['String']>;
  courseName: Scalars['String'];
  classTerm?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['Boolean']>;
  privatePosts?: Maybe<Scalars['Boolean']>;
  studentPolls?: Maybe<Scalars['Boolean']>;
  description?: Maybe<Scalars['String']>;
  /** Reads and enables pagination through a set of `UserClass`. */
  userClassesByClassId: UserClassesConnection;
};


export type ClassUserClassesByClassIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<UserClassesOrderBy>>;
  condition?: Maybe<UserClassCondition>;
  filter?: Maybe<UserClassFilter>;
};

/** A condition to be used against `Class` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type ClassCondition = {
  /** Checks for equality with the object’s `classId` field. */
  classId?: Maybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `courseNumber` field. */
  courseNumber?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `courseName` field. */
  courseName?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `classTerm` field. */
  classTerm?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `status` field. */
  status?: Maybe<Scalars['Boolean']>;
  /** Checks for equality with the object’s `privatePosts` field. */
  privatePosts?: Maybe<Scalars['Boolean']>;
  /** Checks for equality with the object’s `studentPolls` field. */
  studentPolls?: Maybe<Scalars['Boolean']>;
  /** Checks for equality with the object’s `description` field. */
  description?: Maybe<Scalars['String']>;
};

/** A filter to be used against `Class` object types. All fields are combined with a logical ‘and.’ */
export type ClassFilter = {
  /** Filter by the object’s `classId` field. */
  classId?: Maybe<UuidFilter>;
  /** Filter by the object’s `courseNumber` field. */
  courseNumber?: Maybe<StringFilter>;
  /** Filter by the object’s `courseName` field. */
  courseName?: Maybe<StringFilter>;
  /** Filter by the object’s `classTerm` field. */
  classTerm?: Maybe<StringFilter>;
  /** Filter by the object’s `status` field. */
  status?: Maybe<BooleanFilter>;
  /** Filter by the object’s `privatePosts` field. */
  privatePosts?: Maybe<BooleanFilter>;
  /** Filter by the object’s `studentPolls` field. */
  studentPolls?: Maybe<BooleanFilter>;
  /** Filter by the object’s `description` field. */
  description?: Maybe<StringFilter>;
  /** Checks for all expressions in this list. */
  and?: Maybe<Array<ClassFilter>>;
  /** Checks for any expressions in this list. */
  or?: Maybe<Array<ClassFilter>>;
  /** Negates the expression. */
  not?: Maybe<ClassFilter>;
};

/** An input for mutations affecting `Class` */
export type ClassInput = {
  classId?: Maybe<Scalars['UUID']>;
  courseNumber?: Maybe<Scalars['String']>;
  courseName: Scalars['String'];
  classTerm?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['Boolean']>;
  privatePosts?: Maybe<Scalars['Boolean']>;
  studentPolls?: Maybe<Scalars['Boolean']>;
  description?: Maybe<Scalars['String']>;
};

/** Represents an update to a `Class`. Fields that are set will be updated. */
export type ClassPatch = {
  classId?: Maybe<Scalars['UUID']>;
  courseNumber?: Maybe<Scalars['String']>;
  courseName?: Maybe<Scalars['String']>;
  classTerm?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['Boolean']>;
  privatePosts?: Maybe<Scalars['Boolean']>;
  studentPolls?: Maybe<Scalars['Boolean']>;
  description?: Maybe<Scalars['String']>;
};

/** A connection to a list of `Class` values. */
export type ClassesConnection = {
  __typename?: 'ClassesConnection';
  /** A list of `Class` objects. */
  nodes: Array<Maybe<Class>>;
  /** A list of edges which contains the `Class` and cursor to aid in pagination. */
  edges: Array<ClassesEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Class` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Class` edge in the connection. */
export type ClassesEdge = {
  __typename?: 'ClassesEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Class` at the end of the edge. */
  node?: Maybe<Class>;
};

/** Methods to use when ordering `Class`. */
export enum ClassesOrderBy {
  Natural = 'NATURAL',
  ClassIdAsc = 'CLASS_ID_ASC',
  ClassIdDesc = 'CLASS_ID_DESC',
  CourseNumberAsc = 'COURSE_NUMBER_ASC',
  CourseNumberDesc = 'COURSE_NUMBER_DESC',
  CourseNameAsc = 'COURSE_NAME_ASC',
  CourseNameDesc = 'COURSE_NAME_DESC',
  ClassTermAsc = 'CLASS_TERM_ASC',
  ClassTermDesc = 'CLASS_TERM_DESC',
  StatusAsc = 'STATUS_ASC',
  StatusDesc = 'STATUS_DESC',
  PrivatePostsAsc = 'PRIVATE_POSTS_ASC',
  PrivatePostsDesc = 'PRIVATE_POSTS_DESC',
  StudentPollsAsc = 'STUDENT_POLLS_ASC',
  StudentPollsDesc = 'STUDENT_POLLS_DESC',
  DescriptionAsc = 'DESCRIPTION_ASC',
  DescriptionDesc = 'DESCRIPTION_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

/** All input for the create `Class` mutation. */
export type CreateClassInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Class` to be created by this mutation. */
  class: ClassInput;
};

/** The output of our create `Class` mutation. */
export type CreateClassPayload = {
  __typename?: 'CreateClassPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Class` that was created by this mutation. */
  class?: Maybe<Class>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** An edge for our `Class`. May be used by Relay 1. */
  classEdge?: Maybe<ClassesEdge>;
};


/** The output of our create `Class` mutation. */
export type CreateClassPayloadClassEdgeArgs = {
  orderBy?: Maybe<Array<ClassesOrderBy>>;
};

/** All input for the create `UserClass` mutation. */
export type CreateUserClassInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `UserClass` to be created by this mutation. */
  userClass: UserClassInput;
};

/** The output of our create `UserClass` mutation. */
export type CreateUserClassPayload = {
  __typename?: 'CreateUserClassPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `UserClass` that was created by this mutation. */
  userClass?: Maybe<UserClass>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `User` that is related to this `UserClass`. */
  userByUserId?: Maybe<User>;
  /** Reads a single `Class` that is related to this `UserClass`. */
  classByClassId?: Maybe<Class>;
  /** An edge for our `UserClass`. May be used by Relay 1. */
  userClassEdge?: Maybe<UserClassesEdge>;
};


/** The output of our create `UserClass` mutation. */
export type CreateUserClassPayloadUserClassEdgeArgs = {
  orderBy?: Maybe<Array<UserClassesOrderBy>>;
};

/** All input for the create `User` mutation. */
export type CreateUserInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `User` to be created by this mutation. */
  user: UserInput;
};

/** The output of our create `User` mutation. */
export type CreateUserPayload = {
  __typename?: 'CreateUserPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `User` that was created by this mutation. */
  user?: Maybe<User>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** An edge for our `User`. May be used by Relay 1. */
  userEdge?: Maybe<UsersEdge>;
};


/** The output of our create `User` mutation. */
export type CreateUserPayloadUserEdgeArgs = {
  orderBy?: Maybe<Array<UsersOrderBy>>;
};



/** A filter to be used against Datetime fields. All fields are combined with a logical ‘and.’ */
export type DatetimeFilter = {
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: Maybe<Scalars['Boolean']>;
  /** Equal to the specified value. */
  equalTo?: Maybe<Scalars['Datetime']>;
  /** Not equal to the specified value. */
  notEqualTo?: Maybe<Scalars['Datetime']>;
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: Maybe<Scalars['Datetime']>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: Maybe<Scalars['Datetime']>;
  /** Included in the specified list. */
  in?: Maybe<Array<Scalars['Datetime']>>;
  /** Not included in the specified list. */
  notIn?: Maybe<Array<Scalars['Datetime']>>;
  /** Less than the specified value. */
  lessThan?: Maybe<Scalars['Datetime']>;
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: Maybe<Scalars['Datetime']>;
  /** Greater than the specified value. */
  greaterThan?: Maybe<Scalars['Datetime']>;
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: Maybe<Scalars['Datetime']>;
};

/** All input for the `deleteClassByClassId` mutation. */
export type DeleteClassByClassIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  classId: Scalars['UUID'];
};

/** All input for the `deleteClass` mutation. */
export type DeleteClassInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `Class` to be deleted. */
  nodeId: Scalars['ID'];
};

/** The output of our delete `Class` mutation. */
export type DeleteClassPayload = {
  __typename?: 'DeleteClassPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Class` that was deleted by this mutation. */
  class?: Maybe<Class>;
  deletedClassId?: Maybe<Scalars['ID']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** An edge for our `Class`. May be used by Relay 1. */
  classEdge?: Maybe<ClassesEdge>;
};


/** The output of our delete `Class` mutation. */
export type DeleteClassPayloadClassEdgeArgs = {
  orderBy?: Maybe<Array<ClassesOrderBy>>;
};

/** All input for the `deleteUserByUserId` mutation. */
export type DeleteUserByUserIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  userId: Scalars['UUID'];
};

/** All input for the `deleteUserClassByUserIdAndClassId` mutation. */
export type DeleteUserClassByUserIdAndClassIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  userId: Scalars['UUID'];
  classId: Scalars['UUID'];
};

/** All input for the `deleteUserClass` mutation. */
export type DeleteUserClassInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `UserClass` to be deleted. */
  nodeId: Scalars['ID'];
};

/** The output of our delete `UserClass` mutation. */
export type DeleteUserClassPayload = {
  __typename?: 'DeleteUserClassPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `UserClass` that was deleted by this mutation. */
  userClass?: Maybe<UserClass>;
  deletedUserClassId?: Maybe<Scalars['ID']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `User` that is related to this `UserClass`. */
  userByUserId?: Maybe<User>;
  /** Reads a single `Class` that is related to this `UserClass`. */
  classByClassId?: Maybe<Class>;
  /** An edge for our `UserClass`. May be used by Relay 1. */
  userClassEdge?: Maybe<UserClassesEdge>;
};


/** The output of our delete `UserClass` mutation. */
export type DeleteUserClassPayloadUserClassEdgeArgs = {
  orderBy?: Maybe<Array<UserClassesOrderBy>>;
};

/** All input for the `deleteUser` mutation. */
export type DeleteUserInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `User` to be deleted. */
  nodeId: Scalars['ID'];
};

/** The output of our delete `User` mutation. */
export type DeleteUserPayload = {
  __typename?: 'DeleteUserPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `User` that was deleted by this mutation. */
  user?: Maybe<User>;
  deletedUserId?: Maybe<Scalars['ID']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** An edge for our `User`. May be used by Relay 1. */
  userEdge?: Maybe<UsersEdge>;
};


/** The output of our delete `User` mutation. */
export type DeleteUserPayloadUserEdgeArgs = {
  orderBy?: Maybe<Array<UsersOrderBy>>;
};


/** The root mutation type which contains root level fields which mutate data. */
export type Mutation = {
  __typename?: 'Mutation';
  /** Creates a single `Class`. */
  createClass?: Maybe<CreateClassPayload>;
  /** Creates a single `User`. */
  createUser?: Maybe<CreateUserPayload>;
  /** Creates a single `UserClass`. */
  createUserClass?: Maybe<CreateUserClassPayload>;
  /** Updates a single `Class` using its globally unique id and a patch. */
  updateClass?: Maybe<UpdateClassPayload>;
  /** Updates a single `Class` using a unique key and a patch. */
  updateClassByClassId?: Maybe<UpdateClassPayload>;
  /** Updates a single `User` using its globally unique id and a patch. */
  updateUser?: Maybe<UpdateUserPayload>;
  /** Updates a single `User` using a unique key and a patch. */
  updateUserByUserId?: Maybe<UpdateUserPayload>;
  /** Updates a single `UserClass` using its globally unique id and a patch. */
  updateUserClass?: Maybe<UpdateUserClassPayload>;
  /** Updates a single `UserClass` using a unique key and a patch. */
  updateUserClassByUserIdAndClassId?: Maybe<UpdateUserClassPayload>;
  /** Deletes a single `Class` using its globally unique id. */
  deleteClass?: Maybe<DeleteClassPayload>;
  /** Deletes a single `Class` using a unique key. */
  deleteClassByClassId?: Maybe<DeleteClassPayload>;
  /** Deletes a single `User` using its globally unique id. */
  deleteUser?: Maybe<DeleteUserPayload>;
  /** Deletes a single `User` using a unique key. */
  deleteUserByUserId?: Maybe<DeleteUserPayload>;
  /** Deletes a single `UserClass` using its globally unique id. */
  deleteUserClass?: Maybe<DeleteUserClassPayload>;
  /** Deletes a single `UserClass` using a unique key. */
  deleteUserClassByUserIdAndClassId?: Maybe<DeleteUserClassPayload>;
  authenticate?: Maybe<AuthenticatePayload>;
  authenticateAdmin?: Maybe<AuthenticateAdminPayload>;
  registerAdmin?: Maybe<RegisterAdminPayload>;
  registerUser?: Maybe<RegisterUserPayload>;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateClassArgs = {
  input: CreateClassInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateUserArgs = {
  input: CreateUserInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateUserClassArgs = {
  input: CreateUserClassInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateClassArgs = {
  input: UpdateClassInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateClassByClassIdArgs = {
  input: UpdateClassByClassIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateUserArgs = {
  input: UpdateUserInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateUserByUserIdArgs = {
  input: UpdateUserByUserIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateUserClassArgs = {
  input: UpdateUserClassInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateUserClassByUserIdAndClassIdArgs = {
  input: UpdateUserClassByUserIdAndClassIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteClassArgs = {
  input: DeleteClassInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteClassByClassIdArgs = {
  input: DeleteClassByClassIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteUserArgs = {
  input: DeleteUserInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteUserByUserIdArgs = {
  input: DeleteUserByUserIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteUserClassArgs = {
  input: DeleteUserClassInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteUserClassByUserIdAndClassIdArgs = {
  input: DeleteUserClassByUserIdAndClassIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationAuthenticateArgs = {
  input: AuthenticateInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationAuthenticateAdminArgs = {
  input: AuthenticateAdminInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationRegisterAdminArgs = {
  input: RegisterAdminInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationRegisterUserArgs = {
  input: RegisterUserInput;
};

/** An object with a globally unique `ID`. */
export type Node = {
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
};

/** Information about pagination in a connection. */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean'];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean'];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['Cursor']>;
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['Cursor']>;
};

/** The root query type which gives access points into the data universe. */
export type Query = Node & {
  __typename?: 'Query';
  /**
   * Exposes the root query type nested one level down. This is helpful for Relay 1
   * which can only query top level fields if they are in a particular form.
   */
  query: Query;
  /** The root query type must be a `Node` to work well with Relay 1 mutations. This just resolves to `query`. */
  nodeId: Scalars['ID'];
  /** Fetches an object given its globally unique `ID`. */
  node?: Maybe<Node>;
  /** Reads and enables pagination through a set of `Class`. */
  allClasses?: Maybe<ClassesConnection>;
  /** Reads and enables pagination through a set of `User`. */
  allUsers?: Maybe<UsersConnection>;
  /** Reads and enables pagination through a set of `UserClass`. */
  allUserClasses?: Maybe<UserClassesConnection>;
  classByClassId?: Maybe<Class>;
  userByUserId?: Maybe<User>;
  userClassByUserIdAndClassId?: Maybe<UserClass>;
  currentUser?: Maybe<User>;
  currentUserId?: Maybe<Scalars['UUID']>;
  currentUserRole?: Maybe<Scalars['String']>;
  /** Reads a single `Class` using its globally unique `ID`. */
  class?: Maybe<Class>;
  /** Reads a single `User` using its globally unique `ID`. */
  user?: Maybe<User>;
  /** Reads a single `UserClass` using its globally unique `ID`. */
  userClass?: Maybe<UserClass>;
};


/** The root query type which gives access points into the data universe. */
export type QueryNodeArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryAllClassesArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<ClassesOrderBy>>;
  condition?: Maybe<ClassCondition>;
  filter?: Maybe<ClassFilter>;
};


/** The root query type which gives access points into the data universe. */
export type QueryAllUsersArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<UsersOrderBy>>;
  condition?: Maybe<UserCondition>;
  filter?: Maybe<UserFilter>;
};


/** The root query type which gives access points into the data universe. */
export type QueryAllUserClassesArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<UserClassesOrderBy>>;
  condition?: Maybe<UserClassCondition>;
  filter?: Maybe<UserClassFilter>;
};


/** The root query type which gives access points into the data universe. */
export type QueryClassByClassIdArgs = {
  classId: Scalars['UUID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryUserByUserIdArgs = {
  userId: Scalars['UUID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryUserClassByUserIdAndClassIdArgs = {
  userId: Scalars['UUID'];
  classId: Scalars['UUID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryClassArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryUserArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryUserClassArgs = {
  nodeId: Scalars['ID'];
};

/** All input for the `registerAdmin` mutation. */
export type RegisterAdminInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  username: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
};

/** The output of our `registerAdmin` mutation. */
export type RegisterAdminPayload = {
  __typename?: 'RegisterAdminPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** An edge for our `User`. May be used by Relay 1. */
  userEdge?: Maybe<UsersEdge>;
};


/** The output of our `registerAdmin` mutation. */
export type RegisterAdminPayloadUserEdgeArgs = {
  orderBy?: Maybe<Array<UsersOrderBy>>;
};

/** All input for the `registerUser` mutation. */
export type RegisterUserInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  username: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
};

/** The output of our `registerUser` mutation. */
export type RegisterUserPayload = {
  __typename?: 'RegisterUserPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** An edge for our `User`. May be used by Relay 1. */
  userEdge?: Maybe<UsersEdge>;
};


/** The output of our `registerUser` mutation. */
export type RegisterUserPayloadUserEdgeArgs = {
  orderBy?: Maybe<Array<UsersOrderBy>>;
};

/** A filter to be used against String fields. All fields are combined with a logical ‘and.’ */
export type StringFilter = {
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: Maybe<Scalars['Boolean']>;
  /** Equal to the specified value. */
  equalTo?: Maybe<Scalars['String']>;
  /** Not equal to the specified value. */
  notEqualTo?: Maybe<Scalars['String']>;
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: Maybe<Scalars['String']>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: Maybe<Scalars['String']>;
  /** Included in the specified list. */
  in?: Maybe<Array<Scalars['String']>>;
  /** Not included in the specified list. */
  notIn?: Maybe<Array<Scalars['String']>>;
  /** Less than the specified value. */
  lessThan?: Maybe<Scalars['String']>;
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: Maybe<Scalars['String']>;
  /** Greater than the specified value. */
  greaterThan?: Maybe<Scalars['String']>;
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: Maybe<Scalars['String']>;
  /** Contains the specified string (case-sensitive). */
  includes?: Maybe<Scalars['String']>;
  /** Does not contain the specified string (case-sensitive). */
  notIncludes?: Maybe<Scalars['String']>;
  /** Contains the specified string (case-insensitive). */
  includesInsensitive?: Maybe<Scalars['String']>;
  /** Does not contain the specified string (case-insensitive). */
  notIncludesInsensitive?: Maybe<Scalars['String']>;
  /** Starts with the specified string (case-sensitive). */
  startsWith?: Maybe<Scalars['String']>;
  /** Does not start with the specified string (case-sensitive). */
  notStartsWith?: Maybe<Scalars['String']>;
  /** Starts with the specified string (case-insensitive). */
  startsWithInsensitive?: Maybe<Scalars['String']>;
  /** Does not start with the specified string (case-insensitive). */
  notStartsWithInsensitive?: Maybe<Scalars['String']>;
  /** Ends with the specified string (case-sensitive). */
  endsWith?: Maybe<Scalars['String']>;
  /** Does not end with the specified string (case-sensitive). */
  notEndsWith?: Maybe<Scalars['String']>;
  /** Ends with the specified string (case-insensitive). */
  endsWithInsensitive?: Maybe<Scalars['String']>;
  /** Does not end with the specified string (case-insensitive). */
  notEndsWithInsensitive?: Maybe<Scalars['String']>;
  /** Matches the specified pattern (case-sensitive). An underscore (_) matches any single character; a percent sign (%) matches any sequence of zero or more characters. */
  like?: Maybe<Scalars['String']>;
  /** Does not match the specified pattern (case-sensitive). An underscore (_) matches any single character; a percent sign (%) matches any sequence of zero or more characters. */
  notLike?: Maybe<Scalars['String']>;
  /** Matches the specified pattern (case-insensitive). An underscore (_) matches any single character; a percent sign (%) matches any sequence of zero or more characters. */
  likeInsensitive?: Maybe<Scalars['String']>;
  /** Does not match the specified pattern (case-insensitive). An underscore (_) matches any single character; a percent sign (%) matches any sequence of zero or more characters. */
  notLikeInsensitive?: Maybe<Scalars['String']>;
  /** Equal to the specified value (case-insensitive). */
  equalToInsensitive?: Maybe<Scalars['String']>;
  /** Not equal to the specified value (case-insensitive). */
  notEqualToInsensitive?: Maybe<Scalars['String']>;
  /** Not equal to the specified value, treating null like an ordinary value (case-insensitive). */
  distinctFromInsensitive?: Maybe<Scalars['String']>;
  /** Equal to the specified value, treating null like an ordinary value (case-insensitive). */
  notDistinctFromInsensitive?: Maybe<Scalars['String']>;
  /** Included in the specified list (case-insensitive). */
  inInsensitive?: Maybe<Array<Scalars['String']>>;
  /** Not included in the specified list (case-insensitive). */
  notInInsensitive?: Maybe<Array<Scalars['String']>>;
  /** Less than the specified value (case-insensitive). */
  lessThanInsensitive?: Maybe<Scalars['String']>;
  /** Less than or equal to the specified value (case-insensitive). */
  lessThanOrEqualToInsensitive?: Maybe<Scalars['String']>;
  /** Greater than the specified value (case-insensitive). */
  greaterThanInsensitive?: Maybe<Scalars['String']>;
  /** Greater than or equal to the specified value (case-insensitive). */
  greaterThanOrEqualToInsensitive?: Maybe<Scalars['String']>;
};


/** A filter to be used against UUID fields. All fields are combined with a logical ‘and.’ */
export type UuidFilter = {
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: Maybe<Scalars['Boolean']>;
  /** Equal to the specified value. */
  equalTo?: Maybe<Scalars['UUID']>;
  /** Not equal to the specified value. */
  notEqualTo?: Maybe<Scalars['UUID']>;
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: Maybe<Scalars['UUID']>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: Maybe<Scalars['UUID']>;
  /** Included in the specified list. */
  in?: Maybe<Array<Scalars['UUID']>>;
  /** Not included in the specified list. */
  notIn?: Maybe<Array<Scalars['UUID']>>;
  /** Less than the specified value. */
  lessThan?: Maybe<Scalars['UUID']>;
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: Maybe<Scalars['UUID']>;
  /** Greater than the specified value. */
  greaterThan?: Maybe<Scalars['UUID']>;
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: Maybe<Scalars['UUID']>;
};

/** All input for the `updateClassByClassId` mutation. */
export type UpdateClassByClassIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `Class` being updated. */
  classPatch: ClassPatch;
  classId: Scalars['UUID'];
};

/** All input for the `updateClass` mutation. */
export type UpdateClassInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `Class` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `Class` being updated. */
  classPatch: ClassPatch;
};

/** The output of our update `Class` mutation. */
export type UpdateClassPayload = {
  __typename?: 'UpdateClassPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Class` that was updated by this mutation. */
  class?: Maybe<Class>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** An edge for our `Class`. May be used by Relay 1. */
  classEdge?: Maybe<ClassesEdge>;
};


/** The output of our update `Class` mutation. */
export type UpdateClassPayloadClassEdgeArgs = {
  orderBy?: Maybe<Array<ClassesOrderBy>>;
};

/** All input for the `updateUserByUserId` mutation. */
export type UpdateUserByUserIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `User` being updated. */
  userPatch: UserPatch;
  userId: Scalars['UUID'];
};

/** All input for the `updateUserClassByUserIdAndClassId` mutation. */
export type UpdateUserClassByUserIdAndClassIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `UserClass` being updated. */
  userClassPatch: UserClassPatch;
  userId: Scalars['UUID'];
  classId: Scalars['UUID'];
};

/** All input for the `updateUserClass` mutation. */
export type UpdateUserClassInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `UserClass` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `UserClass` being updated. */
  userClassPatch: UserClassPatch;
};

/** The output of our update `UserClass` mutation. */
export type UpdateUserClassPayload = {
  __typename?: 'UpdateUserClassPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `UserClass` that was updated by this mutation. */
  userClass?: Maybe<UserClass>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `User` that is related to this `UserClass`. */
  userByUserId?: Maybe<User>;
  /** Reads a single `Class` that is related to this `UserClass`. */
  classByClassId?: Maybe<Class>;
  /** An edge for our `UserClass`. May be used by Relay 1. */
  userClassEdge?: Maybe<UserClassesEdge>;
};


/** The output of our update `UserClass` mutation. */
export type UpdateUserClassPayloadUserClassEdgeArgs = {
  orderBy?: Maybe<Array<UserClassesOrderBy>>;
};

/** All input for the `updateUser` mutation. */
export type UpdateUserInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `User` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `User` being updated. */
  userPatch: UserPatch;
};

/** The output of our update `User` mutation. */
export type UpdateUserPayload = {
  __typename?: 'UpdateUserPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `User` that was updated by this mutation. */
  user?: Maybe<User>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** An edge for our `User`. May be used by Relay 1. */
  userEdge?: Maybe<UsersEdge>;
};


/** The output of our update `User` mutation. */
export type UpdateUserPayloadUserEdgeArgs = {
  orderBy?: Maybe<Array<UsersOrderBy>>;
};

export type User = Node & {
  __typename?: 'User';
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  userId: Scalars['UUID'];
  name: Scalars['String'];
  username: Scalars['String'];
  createdAt?: Maybe<Scalars['Datetime']>;
  updatedAt?: Maybe<Scalars['Datetime']>;
  /** Reads and enables pagination through a set of `UserClass`. */
  userClassesByUserId: UserClassesConnection;
};


export type UserUserClassesByUserIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<UserClassesOrderBy>>;
  condition?: Maybe<UserClassCondition>;
  filter?: Maybe<UserClassFilter>;
};

export type UserClass = Node & {
  __typename?: 'UserClass';
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  userId: Scalars['UUID'];
  classId: Scalars['UUID'];
  userRole?: Maybe<UserRole>;
  /** Reads a single `User` that is related to this `UserClass`. */
  userByUserId?: Maybe<User>;
  /** Reads a single `Class` that is related to this `UserClass`. */
  classByClassId?: Maybe<Class>;
};

/**
 * A condition to be used against `UserClass` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 */
export type UserClassCondition = {
  /** Checks for equality with the object’s `userId` field. */
  userId?: Maybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `classId` field. */
  classId?: Maybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `userRole` field. */
  userRole?: Maybe<UserRole>;
};

/** A filter to be used against `UserClass` object types. All fields are combined with a logical ‘and.’ */
export type UserClassFilter = {
  /** Filter by the object’s `userId` field. */
  userId?: Maybe<UuidFilter>;
  /** Filter by the object’s `classId` field. */
  classId?: Maybe<UuidFilter>;
  /** Filter by the object’s `userRole` field. */
  userRole?: Maybe<UserRoleFilter>;
  /** Checks for all expressions in this list. */
  and?: Maybe<Array<UserClassFilter>>;
  /** Checks for any expressions in this list. */
  or?: Maybe<Array<UserClassFilter>>;
  /** Negates the expression. */
  not?: Maybe<UserClassFilter>;
};

/** An input for mutations affecting `UserClass` */
export type UserClassInput = {
  userId: Scalars['UUID'];
  classId: Scalars['UUID'];
  userRole?: Maybe<UserRole>;
};

/** Represents an update to a `UserClass`. Fields that are set will be updated. */
export type UserClassPatch = {
  userId?: Maybe<Scalars['UUID']>;
  classId?: Maybe<Scalars['UUID']>;
  userRole?: Maybe<UserRole>;
};

/** A connection to a list of `UserClass` values. */
export type UserClassesConnection = {
  __typename?: 'UserClassesConnection';
  /** A list of `UserClass` objects. */
  nodes: Array<Maybe<UserClass>>;
  /** A list of edges which contains the `UserClass` and cursor to aid in pagination. */
  edges: Array<UserClassesEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `UserClass` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `UserClass` edge in the connection. */
export type UserClassesEdge = {
  __typename?: 'UserClassesEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `UserClass` at the end of the edge. */
  node?: Maybe<UserClass>;
};

/** Methods to use when ordering `UserClass`. */
export enum UserClassesOrderBy {
  Natural = 'NATURAL',
  UserIdAsc = 'USER_ID_ASC',
  UserIdDesc = 'USER_ID_DESC',
  ClassIdAsc = 'CLASS_ID_ASC',
  ClassIdDesc = 'CLASS_ID_DESC',
  UserRoleAsc = 'USER_ROLE_ASC',
  UserRoleDesc = 'USER_ROLE_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

/** A condition to be used against `User` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type UserCondition = {
  /** Checks for equality with the object’s `userId` field. */
  userId?: Maybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `name` field. */
  name?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `username` field. */
  username?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: Maybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `updatedAt` field. */
  updatedAt?: Maybe<Scalars['Datetime']>;
};

/** A filter to be used against `User` object types. All fields are combined with a logical ‘and.’ */
export type UserFilter = {
  /** Filter by the object’s `userId` field. */
  userId?: Maybe<UuidFilter>;
  /** Filter by the object’s `name` field. */
  name?: Maybe<StringFilter>;
  /** Filter by the object’s `username` field. */
  username?: Maybe<StringFilter>;
  /** Filter by the object’s `createdAt` field. */
  createdAt?: Maybe<DatetimeFilter>;
  /** Filter by the object’s `updatedAt` field. */
  updatedAt?: Maybe<DatetimeFilter>;
  /** Checks for all expressions in this list. */
  and?: Maybe<Array<UserFilter>>;
  /** Checks for any expressions in this list. */
  or?: Maybe<Array<UserFilter>>;
  /** Negates the expression. */
  not?: Maybe<UserFilter>;
};

/** An input for mutations affecting `User` */
export type UserInput = {
  userId?: Maybe<Scalars['UUID']>;
  name: Scalars['String'];
  username: Scalars['String'];
  createdAt?: Maybe<Scalars['Datetime']>;
  updatedAt?: Maybe<Scalars['Datetime']>;
};

/** Represents an update to a `User`. Fields that are set will be updated. */
export type UserPatch = {
  userId?: Maybe<Scalars['UUID']>;
  name?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['Datetime']>;
  updatedAt?: Maybe<Scalars['Datetime']>;
};

export enum UserRole {
  Instructor = 'INSTRUCTOR',
  Student = 'STUDENT',
  TeachingAssistant = 'TEACHING_ASSISTANT'
}

/** A filter to be used against UserRole fields. All fields are combined with a logical ‘and.’ */
export type UserRoleFilter = {
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: Maybe<Scalars['Boolean']>;
  /** Equal to the specified value. */
  equalTo?: Maybe<UserRole>;
  /** Not equal to the specified value. */
  notEqualTo?: Maybe<UserRole>;
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: Maybe<UserRole>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: Maybe<UserRole>;
  /** Included in the specified list. */
  in?: Maybe<Array<UserRole>>;
  /** Not included in the specified list. */
  notIn?: Maybe<Array<UserRole>>;
  /** Less than the specified value. */
  lessThan?: Maybe<UserRole>;
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: Maybe<UserRole>;
  /** Greater than the specified value. */
  greaterThan?: Maybe<UserRole>;
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: Maybe<UserRole>;
};

/** A connection to a list of `User` values. */
export type UsersConnection = {
  __typename?: 'UsersConnection';
  /** A list of `User` objects. */
  nodes: Array<Maybe<User>>;
  /** A list of edges which contains the `User` and cursor to aid in pagination. */
  edges: Array<UsersEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `User` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `User` edge in the connection. */
export type UsersEdge = {
  __typename?: 'UsersEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `User` at the end of the edge. */
  node?: Maybe<User>;
};

/** Methods to use when ordering `User`. */
export enum UsersOrderBy {
  Natural = 'NATURAL',
  UserIdAsc = 'USER_ID_ASC',
  UserIdDesc = 'USER_ID_DESC',
  NameAsc = 'NAME_ASC',
  NameDesc = 'NAME_DESC',
  UsernameAsc = 'USERNAME_ASC',
  UsernameDesc = 'USERNAME_DESC',
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  UpdatedAtAsc = 'UPDATED_AT_ASC',
  UpdatedAtDesc = 'UPDATED_AT_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

export type AuthenticateMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type AuthenticateMutation = (
  { __typename?: 'Mutation' }
  & { authenticate?: Maybe<(
    { __typename?: 'AuthenticatePayload' }
    & Pick<AuthenticatePayload, 'clientMutationId' | 'jwtToken'>
  )> }
);

export type RegisterUserMutationVariables = Exact<{
  name: Scalars['String'];
  username: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type RegisterUserMutation = (
  { __typename?: 'Mutation' }
  & { registerUser?: Maybe<(
    { __typename?: 'RegisterUserPayload' }
    & Pick<RegisterUserPayload, 'clientMutationId'>
    & { user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'username' | 'createdAt' | 'updatedAt'>
    )> }
  )> }
);


export const AuthenticateDocument = gql`
    mutation authenticate($email: String!, $password: String!) {
  authenticate(input: {email: $email, password: $password}) {
    clientMutationId
    jwtToken
  }
}
    `;
export type AuthenticateMutationFn = Apollo.MutationFunction<AuthenticateMutation, AuthenticateMutationVariables>;

/**
 * __useAuthenticateMutation__
 *
 * To run a mutation, you first call `useAuthenticateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAuthenticateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [authenticateMutation, { data, loading, error }] = useAuthenticateMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useAuthenticateMutation(baseOptions?: Apollo.MutationHookOptions<AuthenticateMutation, AuthenticateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AuthenticateMutation, AuthenticateMutationVariables>(AuthenticateDocument, options);
      }
export type AuthenticateMutationHookResult = ReturnType<typeof useAuthenticateMutation>;
export type AuthenticateMutationResult = Apollo.MutationResult<AuthenticateMutation>;
export type AuthenticateMutationOptions = Apollo.BaseMutationOptions<AuthenticateMutation, AuthenticateMutationVariables>;
export const RegisterUserDocument = gql`
    mutation registerUser($name: String!, $username: String!, $email: String!, $password: String!) {
  registerUser(
    input: {name: $name, username: $username, email: $email, password: $password}
  ) {
    clientMutationId
    user {
      username
      createdAt
      updatedAt
    }
  }
}
    `;
export type RegisterUserMutationFn = Apollo.MutationFunction<RegisterUserMutation, RegisterUserMutationVariables>;

/**
 * __useRegisterUserMutation__
 *
 * To run a mutation, you first call `useRegisterUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerUserMutation, { data, loading, error }] = useRegisterUserMutation({
 *   variables: {
 *      name: // value for 'name'
 *      username: // value for 'username'
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useRegisterUserMutation(baseOptions?: Apollo.MutationHookOptions<RegisterUserMutation, RegisterUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterUserMutation, RegisterUserMutationVariables>(RegisterUserDocument, options);
      }
export type RegisterUserMutationHookResult = ReturnType<typeof useRegisterUserMutation>;
export type RegisterUserMutationResult = Apollo.MutationResult<RegisterUserMutation>;
export type RegisterUserMutationOptions = Apollo.BaseMutationOptions<RegisterUserMutation, RegisterUserMutationVariables>;