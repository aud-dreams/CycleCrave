# API routes:

#### `users/{uid}`

```json
{
  "uid": {
    "email": "email@gmail.com",
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
      "moodswings": true,
      "headache": true,
      "cramps": true,
      "pms": true,
      "bloating": true,
      "constipation": false
    }
  }
}
```

#### `cravings/{uid}`

```json
{
  "uid": {
    "timestamp": {
      "sweet": false,
      "salty": true,
      "thirst": true,
      "fruity": true,
      "crispy": true
    }
  }
}
```

#### `nutritionplans/{planId}`

```json
{
  "planId": {
    "name": "Leafy Greens",
    "description": "Iron and magnesium..."
  }
}
```
