# README

## userテーブル
|column|Type|Option|
|------|----|------|
|user_id|integer|null: false, unique: true|
|email|varvhar|null: false, unique: true|
|group_id|integer|foreign_key: true|
|password|varchar|null: false|
### Association
- has_many :groups, through: :group_users
- has_many :posts


## groupsテーブル
|column|Type|Option|
|------|----|------|
|group_id|integer|null: false, unique: true|
|group_name|varchar|null: false, unique: true|
|user_id|integer|null: false, foreign_key: true|
|post_id|integer|null: false,unique: true|
### Association
- has_many :users, through: :group_users


## group_usersテーブル
|column|Type|Option|
|------|----|------|
|id|integer|null: false, unique: true|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|
|post_id|integer|null: false,unique: true|
### Association
- belongs_to :group
- belongs_to :user


## postテーブル
|column|Type|Option|
|------|----|------|
|post_id|integer|null: false, unique: true|
|user_id|integer|null: false, foreign_key: true|
|create_time|integer|null: fals|
|group_id|integer|null: false, foreign_key: true|
|text|varchar|
|image|varchar|
### Association
- belomgs_to :user
- belongs_to :group