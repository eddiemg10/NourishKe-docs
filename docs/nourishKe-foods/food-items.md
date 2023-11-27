---
sidebar_position: 1
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# NourishKe Food Items

Welcome to the NourishKe Foods API documentation. This API provides comprehensive information about food items sourced from the [Kenya Food Composition Table (KFCT) of 2018](https://www.nutritionhealth.or.ke/wp-content/uploads/Downloads/Kenya%20Food%20Compostion%20Tables%202018.pdf).

## Food Item Attributes

The attributes of a food item include:

| Attribute         | Description                                                                                                                                   |
| ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `_id`             | Unique identifier of the food item within the NourishKe API.                                                                                  |
| `code_kfct`       | Code in the Kenya Food Composition Table.                                                                                                     |
| `code_ken`        | Code from the first National Food Composition Tables and the planning of satisfactory diets in Kenya (1993) by Dr. (Mrs.) Jaswati Kaur Sehmi. |
| `english_name`    | English name of the food.                                                                                                                     |
| `scientific_name` | Scientific name of the food.                                                                                                                  |
| `foodgroup_id`    | Identifier of the [food group](/docs/nourishKe-foods/food-groups.md) to which it belongs.                                                     |
| `biblio_id`       | Bibliography identifier.                                                                                                                      |
| `GI`              | Glycemic Index of the food.                                                                                                                   |

## Available Routes

### How to retrieve multiple food items

You can use the `api/v1/foods` route to retrieve information on multiple foods. This route takes the following optional query parameters:

| Parameter    | Description                                    |
| ------------ | ---------------------------------------------- |
| `page (int)` | The page number for pagination.                |
| `size (int)` | The number of food items to retrieve per page. |
| `groups (string)` | Filter by specifying the food group(s) using Group Ids. Check [filtering foods based on food groups](/docs/nourishKe-foods/food-groups#filtering-foods-based-on-food-groups) for usage details |

:::info

If the following parameters are not supplied, the following default values will be used:

- **page=1**
- **size=10**
  :::

<Tabs>
  <TabItem value="JS_fetch" label="JS fetch" default>
    ```js title="Making a GET request with Javascript fetch api"
    var requestOptions = {
    method: 'GET',
    redirect: 'follow'
    };

    fetch("http://127.0.0.1:8000/api/v1/foods", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
    ```

  </TabItem>
  
  <TabItem value="cURL" label="cURL">
    ```bash title="Making a GET request using cURL"
    curl --location 'http://127.0.0.1:8000/api/v1/foods'
    ```
  </TabItem>

  <TabItem value="Dart" label="Dart">
    ```js title="Making a Dart http GET request"
    var request = http.Request('GET', Uri.parse('http://127.0.0.1:8000/api/v1/foods'));

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

### How to retrieve single food items

You can use the `api/v1/foods/{id}` route to retrieve information on a single food item, provided you its unique identifier:

<Tabs>
  <TabItem value="JS_fetch" label="JS fetch" default>
    ```js title="Making a GET request with Javascript fetch api"
    var requestOptions = {
    method: 'GET',
    redirect: 'follow'
    };

    fetch("http://127.0.0.1:8000/api/v1/foods/653e871bfe351cbe4120a215", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
    ```

  </TabItem>
  
  <TabItem value="cURL" label="cURL">
    ```bash title="Making a GET request using cURL"
    curl --location 'http://127.0.0.1:8000/api/v1/foods/653e871bfe351cbe4120a215'
    ```
  </TabItem>

  <TabItem value="Dart" label="Dart">
    ```js title="Making a Dart http GET request"
    var request = http.Request('GET', Uri.parse('http://127.0.0.1:8000/api/v1/foods/653e871bfe351cbe4120a215'));

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
{
    "code_kfct": "1002",
    "code_ken": "47",
    "english_name": "Amaranth, whole grain,flour",
    "scientific_name": "Amaranthus spp",
    "foodgroup_id": "653e83a8fe351cbe412097ed",
    "biblio_id": "KEN93-59, US28-20001,IN17-A001,IN17-A002",
    "_id": "653e871bfe351cbe4120a215"
}
```

### Getting nutritional information of a food item

The `api/v1/foods/{id}/nutrition` route provides the nutritional information of a specified food item id. The response follows this schema:

|Attribute|Description|
|---------|-----------|
|`value`|Value of the nutritional component.|
|`name`|Name of the nutritional component.|
|`unit`|Units that the value is measured in.|
|`infoods_tagname`|International Foods tagname of the value.|
|`denominator`|Denominator of the value.|
|`analysis_method`|Analysis method used to obtain the value.|

:::note

The aboe schema represents 1 nutritional component. The response received will be an array of such objects, each representing each for the nutritional components of the fod item

:::

<Tabs>
  <TabItem value="JS_fetch" label="JS fetch" default>
    ```js title="Making a GET request with Javascript fetch api"
    var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };

fetch("http://127.0.0.1:8000/api/v1/foods/653e871bfe351cbe4120a215/nutrition", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
    ```

  </TabItem>
  
  <TabItem value="cURL" label="cURL">
    ```bash title="Making a GET request using cURL"
    curl --location 'http://127.0.0.1:8000/api/v1/foods/653e871bfe351cbe4120a215/nutrition'
    ```
  </TabItem>

  <TabItem value="Dart" label="Dart">
    ```js title="Making a Dart http GET request"
    var request = http.Request('GET', Uri.parse('http://127.0.0.1:8000/api/v1/foods/653e871bfe351cbe4120a215/nutrition'));

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

<div style={{height: "400px", overflow: 'scroll'}}>
```js
[
    {
        "value": 1540.0,
        "name": "Energy(kJ)",
        "unit": "kJ",
        "infoods_tagname": "ENERC-KJ",
        "denominator": "/100 g EP",
        "analysis_method": "Calc. from energy-yielding components FAT, CHOAVLDF, PROTCNT, FIBTG"
    },
    {
        "value": 10.2,
        "name": "Water",
        "unit": "g",
        "infoods_tagname": "WATER",
        "denominator": "/100 g EP",
        "analysis_method": "ISO 6496"
    },
    {
        "value": 365.0,
        "name": "Energy(kcal)",
        "unit": "kcal",
        "infoods_tagname": "ENERC",
        "denominator": "/100 g EP",
        "analysis_method": "Calc. from energy-yielding components FAT, CHOAVLDF, PROTCNT, FIBTG"
    },
    {
        "value": 13.8,
        "name": "Protein, total",
        "unit": "g",
        "infoods_tagname": "PROTCNT",
        "denominator": "/100 g EP",
        "analysis_method": "Calc. from NT using the correct nitrogen-to-protein conversion factor "
    },
    {
        "value": 1.0,
        "name": "Edible portion coefficient",
        "unit": "",
        "infoods_tagname": "EDIBLE",
        "denominator": "",
        "analysis_method": "Presented as the edible portion of the total food as purchased"
    },
    {
        "value": 6.3,
        "name": "Fat, total",
        "unit": "g",
        "infoods_tagname": "FATCE",
        "denominator": "/100 g EP",
        "analysis_method": "AOAC 2000.18    (Solvent extraction) Derived by analysis using continuous extraction"
    },
    {
        "value": 59.6,
        "name": "Carbohydrate available, by difference",
        "unit": "g",
        "infoods_tagname": "CHOAVLDF",
        "denominator": "/100 g EP",
        "analysis_method": "Calc. from proximates WATER, FAT, PROTCNT, ASH, FIBTG and ALC "
    },
    {
        "value": 8.9,
        "name": "Iron",
        "unit": "mg",
        "infoods_tagname": "FE",
        "denominator": "/100 g EP",
        "analysis_method": "ISO 8070-IDF 120"
    },
    {
        "value": 161.0,
        "name": "Calcium",
        "unit": "mg",
        "infoods_tagname": "CA",
        "denominator": "/100 g EP",
        "analysis_method": "ISO 8070-IDF 119"
    },
    {
        "value": 259.0,
        "name": "Magnesium",
        "unit": "mg",
        "infoods_tagname": "MG",
        "denominator": "/100 g EP",
        "analysis_method": "ISO 8070-IDF 121"
    },
    {
        "value": 405.0,
        "name": "Phosphorus",
        "unit": "mg",
        "infoods_tagname": "P",
        "denominator": "/100 g EP",
        "analysis_method": "ISO 8070-IDF 122"
    },
    {
        "value": 461.0,
        "name": "Potassium",
        "unit": "mg",
        "infoods_tagname": "K",
        "denominator": "/100 g EP",
        "analysis_method": "ISO 8070-IDF 123"
    },
    {
        "value": 3.0,
        "name": "Sodium",
        "unit": "mg",
        "infoods_tagname": "NA",
        "denominator": "/100 g EP",
        "analysis_method": "ISO 8070-IDF 124"
    },
    {
        "value": 0.0,
        "name": "Vitamin A (RAE)",
        "unit": "μg",
        "infoods_tagname": "VITA_RAE",
        "denominator": "/100 g EP",
        "analysis_method": "Calculated as Retinol Activity Equivalent (RAE) (mcg/100 g EP) = mcg retinol + 1/12 mcg β- carotene + 1/24 mcg α-carotene + 1/24 mcg β-cryptoxanthin"
    },
    {
        "value": 20.0,
        "name": "Selenium",
        "unit": "μcg",
        "infoods_tagname": "SE",
        "denominator": "/100 g EP",
        "analysis_method": "ISO 8070-IDF 126"
    },
    {
        "value": 0.0,
        "name": "Retinol",
        "unit": "μg",
        "infoods_tagname": "RETOL",
        "denominator": "/100 g EP",
        "analysis_method": "SOP LBFD-99076"
    },
    {
        "value": 0.0,
        "name": "Vitamin A (RE)",
        "unit": "μg",
        "infoods_tagname": "VITA",
        "denominator": "/100 g EP",
        "analysis_method": "Calculated as Retinol Equivalent (RE) (mcg/100 g EP) = mcg retinol + 1/6 mcg β-carotene + 1/12 mcg α-carotene + 1/12 mcg β-cryptoxanthin"
    },
    {
        "value": 2.7,
        "name": "Zinc",
        "unit": "mg",
        "infoods_tagname": "ZN",
        "denominator": "/100 g EP",
        "analysis_method": "ISO 8070-IDF 125"
    },
    {
        "value": 1.0,
        "name": "b-carotene equivalent",
        "unit": "μg",
        "infoods_tagname": "CARTBEQ",
        "denominator": "/100 g EP",
        "analysis_method": "SOP LBFD-02188 (HPLC-DAD)"
    },
    {
        "value": 0.08,
        "name": "Thiamin",
        "unit": "mg",
        "infoods_tagname": "THIA",
        "denominator": "/100 g EP",
        "analysis_method": "SOP LBFD-00089  AOAC (2012) 942.23"
    },
    {
        "value": 0.7,
        "name": "Niacin",
        "unit": "mg",
        "infoods_tagname": "NIA",
        "denominator": "/100 g EP",
        "analysis_method": "SOP LBFD-05304 AOAC (2012) 985.34"
    },
    {
        "value": 0.15,
        "name": "Riboflavin",
        "unit": "mg",
        "infoods_tagname": "RIBF",
        "denominator": "/100 g EP",
        "analysis_method": "SOP LBFD-00084   AOAC (2012) 970.65"
    },
    {
        "value": 0.0,
        "name": "Vitamin B12",
        "unit": "μg",
        "infoods_tagname": "VITB12",
        "denominator": "/100 g EP",
        "analysis_method": "SOP LBFD-00114   AOAC (2012) 952.20"
    },
    {
        "value": 1.0,
        "name": "Vitamin C",
        "unit": "mg",
        "infoods_tagname": "VITC",
        "denominator": "/100 g EP",
        "analysis_method": "SOP LBFD-00085"
    },
    {
        "value": 0.0,
        "name": "Dietary folate equivalent",
        "unit": "μg",
        "infoods_tagname": "FOLDFE",
        "denominator": "/100 g EP",
        "analysis_method": "Calculated as (DFE) (mcg/100 g EP) = mcg food folate + (1.7 * mcg folic acid)"
    },
    {
        "value": 0.0,
        "name": "Cholesterol",
        "unit": "g",
        "infoods_tagname": "CHOLE",
        "denominator": "/100 g EP",
        "analysis_method": "AOAC (2012) 994.10, GC/FID"
    },
    {
        "value": 0.0,
        "name": "Food folate",
        "unit": "μg",
        "infoods_tagname": "FOLFD",
        "denominator": "/100 g EP",
        "analysis_method": "Naturally occurring food folates"
    },
    {
        "value": 0.0,
        "name": "Oxalate",
        "unit": "mg",
        "infoods_tagname": "OXALAC",
        "denominator": "/100 g EP",
        "analysis_method": "ionic chromatography – conductivity detection (IC–CD) method."
    },
    {
        "value": 0.0,
        "name": "Inositol triphosphate",
        "unit": "mg",
        "infoods_tagname": "IP3",
        "denominator": "/100 g EP",
        "analysis_method": "HPLC"
    },
    {
        "value": 0.0,
        "name": "Inositol tetraphosphate",
        "unit": "mg",
        "infoods_tagname": "IP4",
        "denominator": "/100 g EP",
        "analysis_method": "HPLC"
    },
    {
        "value": 0.0,
        "name": "Inositol pentaphosphate",
        "unit": "mg",
        "infoods_tagname": "IP5",
        "denominator": "/100 g EP",
        "analysis_method": "HPLC"
    },
    {
        "value": 0.0,
        "name": "Inositol hexaphosphate",
        "unit": "mg",
        "infoods_tagname": "IP6",
        "denominator": "/100 g EP",
        "analysis_method": "HPLC"
    },
    {
        "value": 7.1,
        "name": "Fibre, total dietary",
        "unit": "g",
        "infoods_tagname": "FIBTG",
        "denominator": "/100 g EP",
        "analysis_method": "AOAC (2012) 985.29"
    },
    {
        "value": 3.0,
        "name": "Ash",
        "unit": "g",
        "infoods_tagname": "ASH",
        "denominator": "/100 g EP",
        "analysis_method": "AOAC 945.46 (Muffle furnace)"
    }
]
```
</div>

## Expected Responses and Errors

The available routes, when successful should respond with a **<span style={{color: 'green'}}>`HTTP 200 OK`</span>**. However, there are possible errors that may occur when using the NourishKe Foods API which are covered in this section


### 1. Invalid ObjectId Format
**Error Response - <span style={{color: 'orangered'}}>`HTTP 400 Bad Request`</span>**

```js
{
  "detail": "Invalid ObjectId, it must be a 12-byte input or a be a 12-byte input or a 24-character hex string"
}
```

This error occurs when  the provided ID does not follow the correct format for ObjectIds

**Solution:** Check that the `id` provided is correct

### 2. Non-Existent Food Item
**Error Response - <span style={{color: 'orangered'}}>`HTTP 404 Not Found`</span>**

```js
{
  "detail": "Food item not found"
}
```
This error arises if the provided ID is in a valid format but does not correspond to an existing food item

**Solution:** Check that the `id` provided is correct

:::tip

When implementing the NourishKe Foods API in your application, it's essential to anticipate and handle these errors gracefully.

:::