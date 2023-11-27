---
sidebar_position: 1
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Body Mass Index (BMI)

## Introduction

Body Mass Index (BMI) is a crucial health metric used to assess an individual's body weight in relation to their height. In the context of diabetes nutritional management, BMI serves as a valuable indicator of an individual's overall health and is instrumental in tailoring nutritional recommendations.

## Importance in Diabetes Nutritional Management
Maintaining a healthy BMI is particularly important for individuals with diabetes. It provides insights into the distribution of body fat, helping healthcare professionals and individuals themselves to monitor their weight, a key factor in diabetes management.

### Role in Determining Estimated Energy Requirements
BMI plays a pivotal role in estimating the [energy requirements](/docs/health-metrics/EER) of an individual. By understanding the BMI, healthcare providers can better tailor nutritional recommendations to ensure that the energy intake aligns with the individual's health goals and diabetes management plan.

## Obtaining BMI via NourishKe API
To calculate BMI using the NourishKe API, users can make a **<span style={{color: 'orange'}}>`POST`</span>** request to the `/api/v1/healthmetrics/bmi` route, providing their height and weight in the request body as follows:

**Request Body**
|Attribute|Type|Description|
|---------|----|-----------|
|`height`|`float`|Height of patient in cm|
|`weight`|`float`|Weight of patient in kg|

### Example Usage

#### Example Request

<Tabs>
  <TabItem value="JS_fetch" label="JS fetch" default>
    ```js title="Making a POST request with Javascript fetch api"
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
    "height": 180.4,
    "weight": 70
    });

    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };

    fetch("http://127.0.0.1:8000/api/v1/healthmetrics/bmi", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
    ```

  </TabItem>
  
  <TabItem value="cURL" label="cURL">
    ```bash title="Making a POST request using cURL"
    curl --location 'http://127.0.0.1:8000/api/v1/healthmetrics/bmi' \
    --header 'Content-Type: application/json' \
    --data '{
    "height": 180.4,
    "weight": 70
    }'
    ```
  </TabItem>

  <TabItem value="Dart" label="Dart">
    ```js title="Making a Dart http POST request"
    var headers = {
  'Content-Type': 'application/json'
    };
    var request = http.Request('POST', Uri.parse('http://127.0.0.1:8000/api/v1/healthmetrics/bmi'));
    request.body = json.encode({
    "height": 180.4,
    "weight": 70
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
    "bmi": 21.509235451153142
}
```