# Food Truck Trackr API

- Note: All objects will be in `JSON` format.
- The database schema design can be found here: https://dbdesigner.page.link/EE8GXSmFY2fwYpeq7
- When accessing endpoints, send the token received at login in the header of the request in the format: 
```
authorization: jumble of token characters.
```

# Authentication

## Register

**POST** request to: 
`https://food-truck-trackr.herokuapp.com/api/auth/register`

with the body of:

```javascript
// if adding a diner
{
    username: "string",
	password: "string",
	role: 1,
	location: "string"
}

// if adding an operator
{
    username: "string",
	password: "string",
	role: 2
}
```

For the role: 
- `1 = Diner` 
- `2 = Operator`

`username`, `password`, and `role` are **REQUIRED**.

`Location` is **OPTIONAL**

## Login

**POST** request to: 
`https://food-truck-trackr.herokuapp.com/api/auth/login`

with the body of:

```javascript
{
    username: "string",
	password: "string",
	role: 1
}
```

For the role: 
- `1 = Diner` 
- `2 = Operator`

All 3 keys are **REQUIRED**

# Trucks

## Create

**POST** request to: 
` https://food-truck-trackr.herokuapp.com/api/trucks`

with the body of:

```javascript
{
    truckName: "string",
	cuisineType: "string",
    operatorID: 1,
    imageURL: "string"
}
```
`truckName`, `cuisineType`, and `operatorID` are **REQUIRED**.

`imageURL` is **OPTIONAL**

## Read

For A list of all trucks  
**GET** request to: 
` https://food-truck-trackr.herokuapp.com/api/trucks`

For a single truck  
**GET** request to:
` https://food-truck-trackr.herokuapp.com/api/trucks/id` (where `id` is the id of the truck you want.)  
example: `https://food-truck-trackr.herokuapp.com/api/trucks/1` would get you the truck with an id of `1`.

## Update

**PUT** request to: 
` https://food-truck-trackr.herokuapp.com/api/trucks/id` (where `id` is the id of the truck you want.)

with the body of:

```javascript
{
    truckName: "string",
	cuisineType: "string",
    operatorID: 1,
    imageURL: "string"
}
```
With the `PUT` request, you are allowed to pass just the key(s) you want to change, or you can pass the entire object again if you wish. This will work even if the key values you pass are the same as what's already in the database.

## Delete

**DELETE** request to:
` https://food-truck-trackr.herokuapp.com/api/trucks/id` (where `id` is the id of the truck you want.)  
example: `https://food-truck-trackr.herokuapp.com/api/trucks/1` would delete the truck with an id of `1`.

# Current Truck Location

## Create

**POST** request to: 
` https://food-truck-trackr.herokuapp.com/api/location`

with the body of:

```javascript
{
    truckID: 1,
	location: "string",
    departureTime: "YYY-MM-DD HH:MM:SS"
}
```
`truckID`, `location`, and `departureTime` are **REQUIRED**.

## Read

**GET** request to:
` https://food-truck-trackr.herokuapp.com/api/location/id` (where `id` is the id of the truck you want.)  
example: `https://food-truck-trackr.herokuapp.com/api/location/1` would get you the location for the truck with an id of `1`.

## Update

**PUT** request to: 
` https://food-truck-trackr.herokuapp.com/api/location/id` (where `id` is the id of the truck you want.)

with the body of:

```javascript
{
    truckID: 1,
    location: "string",
    departureTime: "YYY-MM-DD HH:MM:SS"
}
```
With the `PUT` request, you are allowed to pass just the key(s) you want to change, or you can pass the entire object again if you wish. This will work even if the key values you pass are the same as what's already in the database.

## Delete

**DELETE** request to:
` https://food-truck-trackr.herokuapp.com/api/location/id` (where `id` is the id of the truck you want.)  
example: `https://food-truck-trackr.herokuapp.com/api/location/1` would delete the truck with an id of `1`.

# Favorite Trucks

## Create

**POST** request to: 
` https://food-truck-trackr.herokuapp.com/api/favoritetrucks`

with the body of:

```javascript
{
    dinerID: 2,
    truckID: 3
}
```
`dinerID` and `truckID` are **REQUIRED**.

## Read

**GET** request to:
` https://food-truck-trackr.herokuapp.com/api/favoritetrucks/id` (where `id` is the id of the truck you want.)  
example: `https://food-truck-trackr.herokuapp.com/api/favoritetrucks/1` would return the list of favorites for the diner with an id of `1`.

## Update

There is no update endpoint because it was unecessary.

## Delete

**DELETE** request to:
`https://food-truck-trackr.herokuapp.com/api/favoritetrucks`

with the body of:

```javascript
{
    dinerID: 2,
    truckID: 3
}
```
`dinerID` and `truckID` are **REQUIRED**.

# Truck Ratings 

## Create

**POST** request to: 
` https://food-truck-trackr.herokuapp.com/api/truckratings`

with the body of:

```javascript
{
    truckID: 3,
    rating: 5
}
```
`truckID` and `rating` are **REQUIRED**.  
`rating` can be an integer between 1-5.

## Read

To retrieve an array of all ratings for **a single truck**:
  
**GET** request to:
` https://food-truck-trackr.herokuapp.com/api/truckratings/id` (where `id` is the id of the truck you want.)  
example: `https://food-truck-trackr.herokuapp.com/api/truckratings/1` would return the list of ratings for the truck with an id of `1`.

To retrieve an array of all ratings for **all trucks truck**:

**GET** request to:
` https://food-truck-trackr.herokuapp.com/api/truckratings`

## Update & Delete
There are not endpoints for update and delete as ratings are not tied to individual users. 

# Menu Items

## Create

**POST** request to: 
` https://food-truck-trackr.herokuapp.com/api/menuitems`

with the body of:

```javascript
{
    itemName: "string",
    itemDescription: "string",
    itemPrice: 10.00
}
```
`itemName` and `itemPrice` are **REQUIRED**.

`itemDescription` is **OPTIONAL**

## Read

For A list of all menu items:  
**GET** request to: 
` https://food-truck-trackr.herokuapp.com/api/menuitems`

For a single menu item:  
**GET** request to:
` https://food-truck-trackr.herokuapp.com/api/menuitems/id` (where `id` is the id of the item you want.)  
example: `https://food-truck-trackr.herokuapp.com/api/menuitems/1` would get you the item with an id of `1`.

## Update

**PUT** request to: 
` https://food-truck-trackr.herokuapp.com/api/menuitems/id` (where `id` is the id of the item you want.)

with the body of:

```javascript
{
    itemName: "string",
    itemDescription: "string",
    itemPrice: 10.00
}
```
With the `PUT` request, you are allowed to pass just the key(s) you want to change, or you can pass the entire object again if you wish. This will work even if the key values you pass are the same as what's already in the database.

## Delete

**DELETE** request to:
` https://food-truck-trackr.herokuapp.com/api/menuitems/id` (where `id` is the id of the item you want.)  
example: `https://food-truck-trackr.herokuapp.com/api/menuitems/1` would delete the item with an id of `1`.

# Truck Menu Items
This table exists to link the menu items with the trucks. It is just a list of truck IDs and menuItem IDs that correspond to their respective IDs on their own tables.

## Create

**POST** request to: 
` https://food-truck-trackr.herokuapp.com/api/truckmenuitems`

with the body of:

```javascript
{
    truckID: 2,
    menuItemID: 3
}
```
`truckID` and `menuItemID` are **REQUIRED**.

## Read

**GET** request to:
` https://food-truck-trackr.herokuapp.com/api/truckmenuitems/id` (where `id` is the id of the truck you want.)  
example: `https://food-truck-trackr.herokuapp.com/api/truckmenuitems/1` would return the list of menu Items for the truck with an id of `1`.

## Update

There is no update endpoint because it was unnecessary.

## Delete

**DELETE** request to:
`https://food-truck-trackr.herokuapp.com/api/truckmenuitems`

with the body of:

```javascript
{
    truckID: 2,
    menuItemID: 3
}
```
`truckID` and `menuItemID` are **REQUIRED**.

# Menu Item Ratings 

## Create

**POST** request to: 
` https://food-truck-trackr.herokuapp.com/api/menuitemratings`

with the body of:

```javascript
{
    menuItemID: 3,
    rating: 5
}
```
`menuItemID` and `rating` are **REQUIRED**.  
`rating` can be an integer between 1-5.

## Read
**GET** request to:
` https://food-truck-trackr.herokuapp.com/api/menuitemratings/id` (where `id` is the id of the menu item you want.)  
example: `https://food-truck-trackr.herokuapp.com/api/menuitemratings/1` would return the list of ratings for the menu item with an id of `1`.

## Update & Delete
There are not endpoints for update and delete as ratings are not tied to individual users. 