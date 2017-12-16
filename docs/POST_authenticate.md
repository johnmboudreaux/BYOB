## `POST` Authenticate

### **URL**

`/api/v1/authenticate`

### **Method:**

`POST`

### **URL Params**

> **Required:**

`appName`

`email`

### **Headers**

`N/A`

### **Request Body**

```
{
  email: 'email@email.com',
  appName: 'appName here'
}
```

### **Success Response:**
  * **Code:** 201 <br />
    **Content:** Object with the `token` as a payload<br />

  OR

### **Error Response:**
  * **Code:** 422 NOT FOUND <br />
    **Content:** `{ error: Missing email or application name 'with included error' }`

  OR

### **Error Response:**
  * **Code:** 500 NOT FOUND <br />
    **Content:** `{ error: Internal Server Error }`
