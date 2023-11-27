---
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# NourishKe Food Groups

## Introduction

In the NourishKe API, [food items](/docs/nourishKe-foods/food-items.md) are categorized into various food groups. Each food group has distinct attributes that help organize and classify related items. Here's an overview of the key attributes of a food group:

|Attribute|Description|
|---------|-----------|
|`_id`|A unique identifier for the food group.|
|`code`|A unique code assigned to the food group.|
|`name`|The name of the food group.|

To retrieve a list of all available food groups, you can make a **GET** request to the /foodgroups route.

**Example Request**

<Tabs>
  <TabItem value="JS_fetch" label="JS fetch" default>
    ```js title="Making a GET request with Javascript fetch api"
    var requestOptions = {
    method: 'GET',
    redirect: 'follow'
    };

fetch("http://127.0.0.1:8000/api/v1/foodgroups", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
    ```

  </TabItem>
  
  <TabItem value="cURL" label="cURL">
    ```bash title="Making a GET request using cURL"
    curl --location 'http://127.0.0.1:8000/api/v1/foodgroups'
    ```
  </TabItem>

  <TabItem value="Dart" label="Dart">
    ```js title="Making a Dart http GET request"
    var request = http.Request('GET', Uri.parse('http://127.0.0.1:8000/api/v1/foodgroups'));


    http.StreamedResponse response = await request.send();

    if (response.statusCode == 200) {
    print(await response.stream.bytesToString());
    }
    else {
    print(response.reasonPhrase);
    }
    ```
  </TabItem>
</Tabs>

**Example Response**

```js
[
    {
        "code": "1",
        "name": "Cereals and cereal products",
        "_id": "653e83a8fe351cbe412097ed"
    },
    {
        "code": "2",
        "name": "Starchy roots, bananas and tubers",
        "_id": "653e83aafe351cbe412097f0"
    },
    {
        "code": "3",
        "name": "Legumes and pulses",
        "_id": "653e83aafe351cbe412097f3"
    },
    {
        "code": "4",
        "name": "Vegetables and vegetable products",
        "_id": "653e83aafe351cbe412097f6"
    },
    {
        "code": "5",
        "name": "Fruits and fruit products",
        "_id": "653e83abfe351cbe412097f9"
    },
    {
        "code": "6",
        "name": "Milk and dairy products",
        "_id": "653e83abfe351cbe412097fb"
    },
    {
        "code": "7",
        "name": "Meats, poultry and eggs",
        "_id": "653e83abfe351cbe412097fd"
    },
    {
        "code": "8",
        "name": "Fish and sea foods",
        "_id": "653e83abfe351cbe412097ff"
    },
    {
        "code": "9",
        "name": "Oils and fats",
        "_id": "653e83acfe351cbe41209801"
    },
    {
        "code": "10",
        "name": "Nuts and seeds",
        "_id": "653e83acfe351cbe41209803"
    },
    {
        "code": "11",
        "name": "Sugar and sweetened products",
        "_id": "653e83acfe351cbe41209805"
    },
    {
        "code": "12",
        "name": "Beverages",
        "_id": "653e83acfe351cbe41209807"
    },
    {
        "code": "13",
        "name": "Condiments and spices",
        "_id": "653e83adfe351cbe41209809"
    },
    {
        "code": "14",
        "name": "Insects",
        "_id": "653e83adfe351cbe4120980b"
    },
    {
        "code": "15",
        "name": "Mixed dishes",
        "_id": "653e83adfe351cbe4120980d"
    }
]
```

## Filtering Foods Based on Food Groups
When using the `/api/v1foods` route to fetch multiple foods, you can add a query parameter `groups` to only fetch foods belonging to 1 or multiple food groups. Here's how you would modify the request url to achieve this effect:

### Example Usage


#### Filtering to only get foods under 1 group
Steps to only get foods under the 'Mixed dishes' group

1. Use the `api/v1/foodgroups` route to get the `_id` of the desired group
   
    ```js
    {
        "code": "15",
        "name": "Mixed dishes",
        // highlight-next-line
        "_id": "653e83adfe351cbe4120980d"
    }
    ```
2. Use the retrieved `_id` to send a filter query
   
    ```js
    /api/v1/foods?groups=653e83adfe351cbe4120980d
    ```


#### Filtering to get foods under more than 1 group
Steps to get foods under the 'Mixed dishes' or 'Beverages' groups

1. Use the `api/v1/foodgroups` route to get the `_id` of the desired group
   
    ```js
    [
        {
            "code": "15",
            "name": "Mixed dishes",
            // highlight-next-line
            "_id": "653e83adfe351cbe4120980d"
        },
        {
            "code": "12",
            "name": "Beverages",
            // highlight-next-line
            "_id": "653e83acfe351cbe41209807"
        }
    ]
    ```
2. Use the retrieved `_id`s to send a filter query 
   
    ```js
    /api/v1/foods?groups=653e83adfe351cbe4120980d&groups=653e83acfe351cbe41209807
    ```
