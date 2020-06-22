
# Chat-space DB設計
## usersテーブル
|Column|Type|Option|
|------|----|------|
|name|string|index: true, null: false, unique: true|
|email|string|null: false, unique: true|
|password|string|null: false|

### Associaton
- has_many :messages
- has_many :users_groups
- has_many :groups, through: :users_groups

## messagesテーブル
|Column|Type|Option|
|------|----|------|
|body|text||
|image|string||
|group_id|integer|null: false, foreign_key: true|
|user_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :user
- belongs_to :group

## groupsテーブル
|Column|Type|Option|
|------|----|------|
|name|string|index: true, null: false, unique: true|

### Association
- has_many :messages
- has_many :users_groups
- has_many :users, through: :users_groups

## users_groupsテーブル
|Column|Type|Option|
|------|----|------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to user
- belongs_to group
