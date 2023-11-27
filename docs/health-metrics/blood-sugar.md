---
sidebar_position: 4
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Blood Sugar

## Introduction
The NourishKe Blood Sugar service provides a versatile mechanism for converting blood sugar test readings you would get from tests or wearables into different units. Additionally, it offers valuable insights into the blood sugar level's interpretation based on the type of test conducted.

## Blood Sugar Units conversion
The service supports the conversion of blood sugar values between the following units:

- `mg/dL` (milligrams per deciliter)
- `mmol/L` (millimoles per liter)
- `%` (percentage)

It does this by applying conversion factors provided by the American Diabetes Association

## Blood Sugar Test Types
### 1. A1C Test
The A1C test, also known as the glycated hemoglobin test, measures the average blood sugar level over the past 2-3 months. It does not require fasting. The test is performed by analyzing a small blood sample taken from the fingertip or vein.

### 2. Random Blood Sugar Test
This test measures blood sugar levels at any given time, and fasting is not required. A small blood sample is taken from the fingertip or vein for analysis.

### 3. Fasting Blood Sugar Test
This test measures blood sugar levels after at least 8 hours of fasting. Typically performed in the morning before breakfast, a small blood sample is taken for analysis.

### 4. Glucose Tolerance Test
This test measures how the body responds to a large dose of glucose. It is used to screen for gestational diabetes in pregnant women and diagnose diabetes or prediabetes in adults. Blood sugar levels are checked at 1 hour, 2 hours, and 3 hours after consuming a glucose-rich liquid.

## Blood sugar conversions via the NourishKe API

Conversions can be accessed by sending a **<span style={{color: 'orange'}}>`POST`</span>** request to `/api/v1/healthmetrics/bloodsugar` with a body containing the following fields:

|Attribute|Type|Description|
|---------|----|-----------|
|`value`|`float`|Value of blood sugar readings|
|`units`|`string`|Units the value is in: `mg/dL`, `mmol/L` or `%`|
|`test`|`string`|Type of test: `A1C`, `random`, `fasting` or `tolerance`|

## Example Usage

#### Example Request

<Tabs>
  <TabItem value="JS_fetch" label="JS fetch" default>
    ```js title="Making a POST request with Javascript fetch api"
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
    "value": 120,
    "units": "mg/dL",
    "test": "random"
    });

    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };

    fetch("http://127.0.0.1:8000/api/v1/healthmetrics/bloodsugar", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
    ```

  </TabItem>
  
  <TabItem value="cURL" label="cURL">
    ```bash title="Making a POST request using cURL"
    curl --location 'http://127.0.0.1:8000/api/v1/healthmetrics/bloodsugar' \
    --header 'Content-Type: application/json' \
    --data '{
    "value": 120,
    "units": "mg/dL",
    "test": "random"
    }'
    ```
  </TabItem>

  <TabItem value="Dart" label="Dart">
    ```js title="Making a Dart http POST request"
    var headers = {
    'Content-Type': 'application/json'
    };
    var request = http.Request('POST', Uri.parse('http://127.0.0.1:8000/api/v1/healthmetrics/bloodsugar'));
    request.body = json.encode({
    "value": 120,
    "units": "mg/dL",
    "test": "random"
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
    "blood_sugar_level": [
        {
            "value": 120.0,
            "units": "mg/dL"
        },
        {
            "value": 6.66,
            "units": "mmol/L"
        },
        {
            "value": 5.808362369337979,
            "units": "%"
        }
    ],
    "test": "random",
    "level": "normal"
}
```

:::info

The insights provided for the blood sugar level are not generic but specific to the type of blood sugar test provided. Different tests may have different reference ranges and interpretations.

:::

## Expected Responses and Errors

The available routes, when successful should respond with a **<span style={{color: 'green'}}>`HTTP 200 OK`</span>**. However, there are possible errors that may occur when using the NourishKe Healthmetrics API for bloodsugar which are covered in this section


### 1. Invalid Value for units
**Error Response - <span style={{color: 'orangered'}}>`HTTP 422 Unprocessable Entity`</span>**

```js
{
  "detail": [
    {
      "type": "enum",
      "loc": [
        "body",
        "units"
      ],
      "msg": "Input should be 'mg/dL', 'mmol/L' or '%'",
      "input": "mg/dLs",
      "ctx": {
        "expected": "'mg/dL', 'mmol/L' or '%'"
      }
    }
  ]
}
```

This error occurs when  the value provided for the `units` atribute is not `mg/dL`, `mmol/L` or `%`. 

**Solution:** Ensure `units` provided is an acceptable value (Case sensitive)


### 2. Non-Existent Food Item
**Error Response - <span style={{color: 'orangered'}}>`HTTP 422 Unprocessable Entity`</span>**

```js
{
  "detail": [
    {
      "type": "enum",
      "loc": [
        "body",
        "test"
      ],
      "msg": "Input should be 'A1C', 'random', 'fasting' or 'tolerance'",
      "input": "randoms",
      "ctx": {
        "expected": "'A1C', 'random', 'fasting' or 'tolerance'"
      }
    }
  ]
}
```

This error occurs when  the value provided for the `test` atribute is not `A1C`, `random`, `fasting` or `tolerance`

**Solution:** Ensure `test` provided is either among the permitted values (Case sensitive)


:::tip

When implementing the NourishKe Foods API in your application, it's essential to anticipate and handle these errors gracefully.

:::