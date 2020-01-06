# Food Truck Trackr API

- Note: All objects will be in `JSON` format.
- The database schema design can be found here: https://dbdesigner.page.link/EE8GXSmFY2fwYpeq7

# Authentication

## Register

**POST** request to: 
`https://food-truck-trackr.herokuapp.com/api/auth/register`

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