# Comment Data Structure

The current structure that is used is this:

```js
{
	id: 1,
	name: 'anonymous',
	email: 'anonymous@email.com',
	body: 'comment text',
	created: '2018-01-01 12:00:00',
	parent_id: null,
	model: 'Posts',
	foreign_key: 1,
	user_id: 1
}
```

* **id**: The id of the comment
* **name**: Name of the person who commented if anonymous comments are used
* **email**: Email of the person who commented if anonymous comments are used
* **parent_id**: The parent comment id, required if you want nested comments.
* **model**: An identifier of the domain of the comment, usually the domain model or a database table / object name.
* **foreign_key**: The id of the record inside the model you're commenting on
* **created**: The time the comment was created
