## `POST` Home To Owner

### **URL**

`/api/v1/owners/:id/homes`

### **Method:**

`POST`

### **URL Params**

> **Required:**

```
  id
  houseName
  houseAddress
  description
  bathrooms
  bedrooms
  zipCode
  ownerId
  token
```


### **Headers**

`N/A`

### **Request Body**

```
    {
        "id": 1,
        "houseName": "name here",
        "houseAddress": "address here",
        "description": "description here",
        "bathrooms": "integer here",
        "bedrooms": "integer here",
        "zipCode": "integer here",
        "ownerId": "integer here",
        "token": "token here"
    }
```

### **Success Response:**
  * **Code:** 201 <br />
    **Content:** Array with the `home` object as a payload<br />

  OR

### **Error Response:**
  * **Code:** 422 NOT FOUND <br />
    **Content:** `{ error: Missing required parameter 'with included parameter' }`

  OR

### **Error Response:**
  * **Code:** 500 NOT FOUND <br />
    **Content:** `{ error: Internal Server Error }`
