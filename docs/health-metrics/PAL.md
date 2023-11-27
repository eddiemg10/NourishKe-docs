---
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Physical Activity Level (PAL)

## Introduction
Physical Activity Level (PAL) is a crucial metric used in diabetes nutritional management to estimate an individual's [energy requirements](/docs/health-metrics/EER) based on their daily activity levels. Recognizing the significance of PAL helps in tailoring nutritional recommendations to align with an individual's lifestyle and health goals.

## Categories of Activity Levels
PAL is categorized into four levels:

- `inactive`
- `low Active`
- `active`
- `very Active`

## Obtaining PAL via NourishKe API
To eliminate the need for users to 'guess' their activity level, the NourishKe API provides a mechanism for quantitatively retrieving PAL. This is achieved through the use of formulas recommended by the [Food and Agriculture Organization (FAO)](https://www.fao.org/3/y5686e/y5686e07.htm) that calculate PAL from  Energy costs of activities. The API offers two endpoints to facilitate this process.

### Retrieving Activities
The activites mentioned above can be retrieved by sending a **<span style={{color: 'green'}}>`GET`</span>** request to the `/api/v1/healthmetrics/pal` route.

This will retrieve a list fo activities with the following format:

|Attribute|Type|Description|
|---------|----|-----------|
|`activity`|`string`|Name of the activity|
|`par`|`float`|Physical activity ratio (energy cost of the activity)|

#### Example Request

<Tabs>
  <TabItem value="JS_fetch" label="JS fetch" default>
    ```js title="Making a GET request with Javascript fetch api"
    var requestOptions = {
  method: 'GET',
  redirect: 'follow'
};

fetch("http://127.0.0.1:8000/api/v1/healthmetrics/pal", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
    ```

  </TabItem>
  
  <TabItem value="cURL" label="cURL">
    ```bash title="Making a GET request using cURL"
    curl --location --globoff 'http://127.0.0.1:8000/api/v1/healthmetrics/pal'
    ```
  </TabItem>

  <TabItem value="Dart" label="Dart">
    ```js title="Making a Dart http GET request"
    var request = http.Request('GET', Uri.parse('http://127.0.0.1:8000/api/v1/healthmetrics/pal'));
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

<div style={{height: "400px", overflow: 'scroll'}}>
```js
[
    {
        "activity": "Sleeping",
        "par": 1.0
    },
    {
        "activity": "Personal care (dressing, showering)",
        "par": 2.3
    },
    {
        "activity": "Eating",
        "par": 1.5
    },
    {
        "activity": "Cooking",
        "par": 2.1
    },
    {
        "activity": "Sitting(office work, selling produce, rending shop)",
        "par": 1.5
    },
    {
        "activity": "General household work",
        "par": 2.8
    },
    {
        "activity": "Driving",
        "par": 2.0
    },
    {
        "activity": "Walking at varying paces without a load",
        "par": 3.2
    },
    {
        "activity": "Light leisure activities (watching TV, chatting)",
        "par": 1.4
    },
    {
        "activity": "Standing, carrying light loads (waiting on tables, arranging merchandise)",
        "par": 2.2
    },
    {
        "activity": "Commuting on the bus",
        "par": 1.2
    },
    {
        "activity": "Low intensity aerobic exercise",
        "par": 4.2
    },
    {
        "activity": "Non-mechanized agricultural work (planting, weeding, gathering)",
        "par": 4.1
    },
    {
        "activity": "Collecting water/wood",
        "par": 4.4
    },
    {
        "activity": "Non-mechanized domestic chores (sweeping, washing clothes and dishes by hand)",
        "par": 2.3
    }
]
```
</div>

### Determining PAL
Users should use these activites to determine how many hours in a day they engage in the activities. Their PAL can then be calculated by sending a **<span style={{color: 'orange'}}>`POST`</span>** request to  `/api/v1/healthmetrics/pal` with a body containing an array of objects each with the following format:

|Attribute|Type|Description|
|---------|----|-----------|
|`activity`|`string`|Name of the activity|
|`par`|`float`|Physical activity ratio (energy cost of the activity)|
|`time`|`float`|Time **in hours** a user engages in this activity per day|

:::warning

The sum total of the `time` attribute in the body should not exceed 24 hours, as doing so will trigger an error in the response.

:::

#### Example Request Body

```js
[
  {
    "activity": "Sleeping",
    "par": 1,
    "time": 6
  },
  {
    "activity": "Personal care (dressing, bathing)",
    "par": 2.3,
    "time": 1
  },
  {
    "activity": "Eating",
    "par": 1.4,
    "time": 1
  },

  {
    "activity": "Cooking",
    "par": 2.1,
    "time": 1
  },
  {
    "activity": "Non-mechanized agricultural work",
    "par": 4.1,
    "time": 8
  },
{
    "activity": "Collecting water/wood",
    "par": 4.4,
    "time": 1
  },
{
    "activity": "Non-mechanized domestic chores",
    "par": 2.3,
    "time": 1
  },
{
    "activity": "Walking at varying paces without a laod",
    "par": 3.2,
    "time": 1
  },
  {
    "activity": "Light Leisure Activities",
    "par": 1.4,
    "time": 4
  }
]
```
#### Example Response Body
```js
{
    "pal": "very active",
    "value": 2.5041666666666664
}
```