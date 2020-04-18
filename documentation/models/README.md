DisChat Database Models
====
### Server Model
- serverName
  - Data Type: STRING(30)
- Associations:
  - Server has many Channels (one-to-many)
  - Server has many Users (many-to-many)
### Channel Model
- channelName
  - Data Type: STRING(30)
  - NOT NULLABLE
  - UNIQUE _(Bonus: Unique in servers)_
- ServerId
  - FK
  - Data Type: INTEGER
  - References  Servers(id)
- Associations:
  - Channel belongs to Server (many-to-one)
  - Channel has many Messages (one-to-many)
  - Channel has many Users (many-to-many)
### User Model
- userName
  - Data Type: STRING(30)
  - NOT NULLABLE
  - UNIQUE _(Bonus: Unique but with a random 4 digit code following the username.)_
- userEmail
  - Data Type: STRING(40)
  - NOT NULLABLE
  - UNIQUE
- hashedPassword
  - Data Type: String.Binary()
  - NOT NULLABLE
  - UNIQUE
- ServerId
  - FK
  - Data Type: INTEGER
  - References: Servers(id)
- Associations:
  - User has many Servers (many-to-many)
  - User has many Messages (one-to-many)
  - User has many Channels (many-to-many)
### Message Model
- messageContent
  - Data type: STRING(750)
  - NOT NULLABLE
- ChatId
  - FK
  - Data Type: INTEGER
  - References: Channels(id)
- UserId
  - FK
  - Data Type: INTEGER
  - References: Users(id)
- Associations:
  - Messages belong to Channels (many-to-one)
  - Messages belong to Users (many-to-one)
### UserServers Model
- This acts as a join table between Users and Servers.
- UserId
  - FK
  - Data Type: INTEGER
	- References: Users(id)
- ServerId
  - FK
  - Data Type: INTEGER
  - References: Servers(id)
### UserChannels Model
- This acts as a join table between Users and Channels.
- UserId
	* FK
  * Data Type: INTEGER
	* References: Users(id)
- ChatId
	- FK
  - Data Type: INTEGER
  - References: Channels(id)
###

> *****Each model automatically generates:
> an id (Primary Key),
> createdAt (current Timestamp),
> and updatedAt (current Timestamp) attributes.***\*\*
