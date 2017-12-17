## `PUT` Owner By Id

### **URL**

`/api/v1/owners/:id`

### **Method:**

`PUT`

### **URL Params**

> **Required:**

```
  id
  firstName
  lastName
  streetAddress
  zipCode
  token
```


### **Headers**

`N/A`

### **Request Body**

```
    {
        "id": 1,
        "firstName": "firstName here",
        "lastName": "lastName here",
        "streetAddress": "streetAddress here",
        "zipCode": "zipCode here",
        "token": "token here"
    }
```

### **Success Response:**
  * **Code:** 201 <br />
    **Content:** Array with the `owner` object as a payload<br />

  OR

### **Error Response:**
  * **Code:** 422 NOT FOUND <br />
    **Content:** `{ error: Missing required parameter 'with included parameter' }`

  OR

### **Error Response:**
  * **Code:** 422 NOT FOUND <br />
    **Content:** `{ error: Owner id does not exist}`

  OR

### **Error Response:**
  * **Code:** 500 NOT FOUND <br />
    **Content:** `{ error: Internal Server Error }`
