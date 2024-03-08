# API routes:

#### `users/{uid}`

```json
{
  "uid": {
    "name": "aud",
    "sleepGoal": 8,
    "hydrationGoal": 100,
    "sleepScore": 3,
    "hydrationScore": 3,
    "symtomScore": 3,
    "nutritionplans": {
      "plan1Id": true,
      "plan2Id": false
    }
  }
}
```

#### `hydration/{uid}`

```json
{
  "uid": {
    "03-07-2024": {
      "amount": 80,
      "goalMet": true
    }
  }
}
```

#### `sleep/{uid}`

```json
{
  "uid": {
    "03-07-2024": {
      "amount": 7,
      "goalMet": true
    }
  }
}
```

#### `symptoms/{uid}`

```json
{
  "uid": {
    "timestamp": {
      "Mood Swings": true,
      "Headache": true,
      "Period Cramps": true,
      "PMS": true,
      "Bloating": true,
      "Constipation": false
    }
  }
}
```

#### `cravings/{uid}`

```json
{
  "uid": {
    "timestamp": {
      "Crunchy": false,
      "Fruity": false,
      "Salty": false,
      "Sweet": false,
      "Spicy": false,
      "Thirsty": false
    }
  }
}
```
