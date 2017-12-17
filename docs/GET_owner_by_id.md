## `GET` Get Owner By Id

### **URL**

`/api/v1/owners/:id`

### **Method:**

`GET`

### **URL Params**

> **Required:**

`id`
    Id for the owner assigned by knex

### **Headers**

`N/A`

### **Request Body**

`N/A`

### **Success Response:**
  * **Code:** 200 <br />
    **Content:** Array of content for `owner` as a payload<br />

    OR

### **Error Response:**
  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error: Could not find owner of id with `id`}`

    OR

### **Error Response:**
  * **Code:** 500 NOT FOUND <br />
    **Content:** `{ error: Internal Server Error }`
