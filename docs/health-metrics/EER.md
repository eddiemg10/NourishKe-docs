---
sidebar_position: 3
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Estimated Energy Requirements (EER)

## Introduction
Estimated Energy Requirements (EER) play a vital role in diabetes nutritional management by providing insights into the amount of energy an individual needs to maintain their body weight. Understanding EER is crucial for tailoring personalized nutritional recommendations, especially for individuals with diabetes who need precise energy intake planning.

## Obtaining EER via NourishKe API
NourishKe API employs a comprehensive approach to calculate EER by utilizing a total of 26 formulas recommended by the [Committee on Dietary Reference Intakes for Energy](https://nap.nationalacademies.org/catalog/26818/dietary-reference-intakes-for-energy). These formulas take into account factors such as BMI, gender, and Physical Activity Level, ensuring accurate estimations of an individual's energy needs. This value can be obtained by sending a **<span style={{color: 'orange'}}>`POST`</span>** request to  `/api/v1/healthmetrics/eer` with a body containing the following fields:

|Attribute|Type|Description|
|---------|----|-----------|
|`age`|`int`|Age of patient in years|
|`height`|`float`|Height in of patient in cm|
|`weight`|`float`|Weight in of patient in kg|
|`gender`|`string`|Gender: `male` or `female`|
|`pal`|`string`|Physical activity level of patient. Refer to [PAL](/docs/health-metrics/PAL#obtaining-pal-via-nourishke-api) to see how this can be retrieved|

### Example Usage

#### Example Request

<Tabs>
  <TabItem value="JS_fetch" label="JS fetch" default>
    ```js title="Making a POST request with Javascript fetch api"
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
    "age": 18,
    "height": 180.4,
    "weight": 70,
    "gender": "male",
    "pal": "very active"
    });

    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };

    fetch("http://127.0.0.1:8000/api/v1/healthmetrics/eer", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
    ```

  </TabItem>
  
  <TabItem value="cURL" label="cURL">
    ```bash title="Making a POST request using cURL"
    curl --location 'http://127.0.0.1:8000/api/v1/healthmetrics/eer' \
    --header 'Content-Type: application/json' \
    --data '{
    "age": 18,
    "height": 180.4,
    "weight": 70,
    "gender": "male",
    "pal": "very active"
    }'
    ```
  </TabItem>

  <TabItem value="Dart" label="Dart">
    ```js title="Making a Dart http POST request"
    var headers = {
  'Content-Type': 'application/json'
    };
    var request = http.Request('POST', Uri.parse('http://127.0.0.1:8000/api/v1/healthmetrics/eer'));
    request.body = json.encode({
    "age": 18,
    "height": 180.4,
    "weight": 70,
    "gender": "male",
    "pal": "very active"
    });
    request.headers.addAll(headers);

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

#### Example Response

```js
{
  "value": 3816.5420000000004,
  "description": "kcal/ day"
}
```

## Expected Responses and Errors

The available routes, when successful should respond with a **<span style={{color: 'green'}}>`HTTP 200 OK`</span>**. However, there are possible errors that may occur when using the NourishKe Healthmetrics API for EER which are covered in this section


### 1. Invalid Value for Gender
**Error Response - <span style={{color: 'orangered'}}>`HTTP 422 Unprocessable Entity`</span>**

```js
{
  "detail": [
    {
      "type": "enum",
      "loc": [
        "body",
        "gender"
      ],
      "msg": "Input should be 'male' or 'female'",
      "input": "dmale",
      "ctx": {
        "expected": "'male' or 'female'"
      }
    }
  ]
}
```

This error occurs when  the value provided for the `gender` atribute is not `male` or `female`. 

**Solution:** Ensure `gender` provided is either `male` or `female`
:::note

These values are case sensitive, therefore `Male` will raise an error while `male` will not.

:::

### 2. Non-Existent Food Item
**Error Response - <span style={{color: 'orangered'}}>`HTTP 422 Unprocessable Entity`</span>**

```js
{
  "detail": [
    {
      "type": "enum",
      "loc": [
        "body",
        "gender"
      ],
      "msg": "Input should be 'male' or 'female'",
      "input": "dmale",
      "ctx": {
        "expected": "'male' or 'female'"
      }
    }
  ]
}
```

This error occurs when  the value provided for the `gender` atribute is not `male` or `female`. 

**Solution:** Ensure `pal` provided is either among the [permitted values](/docs/health-metrics/PAL#categories-of-activity-levels)


:::tip

When implementing the NourishKe Foods API in your application, it's essential to anticipate and handle these errors gracefully.

:::