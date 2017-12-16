## `GET` Owners

### **URL**

`/api/v1/owners`

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
    **Content:** Array of `owners` objects<br />
    **Example home Object:**
    ```
    {
        "id": 1,
        "firstName": "name here",
        "lastName": "lastName here",
        "streetAddress": "address here",
        "zipCode": "integer here",
    }, ...
    ```

### **Error Response:**
  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error: 'No owners found' }`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error: 'Internal server error with error included.' }` <br />
