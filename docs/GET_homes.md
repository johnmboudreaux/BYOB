## `GET` Homes

### **URL**

`/api/v1/homes`

### **Method:**

`GET`

### **URL Params**

> **Required:**

`No required params`

### **Headers**

`N/A`

### **Request Body**

`N/A`

### **Success Response:**
  * **Code:** 200 <br />
    **Content:** Array of `homes` objects<br />
    **Example home Object:**
    ```
    {
        "id": 1,
        "houseName": "name here",
        "houseAddress": "address here",
        "description": "description here",
        "bathrooms": "integer here",
        "bedrooms": "integer here",
        "zipCode": "integer here",
        "ownerId": "integer here"
    }, ...
    ```

### **Error Response:**
  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error: 'No home with a specefic id found' }`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error: 'Internal server error with error included.' }` <br />


#### **_Notes:_**

`N/A`
