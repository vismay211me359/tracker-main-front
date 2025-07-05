export const data = [
  {
    category: "gym",
    sections: [
      {
        name: "chest",
        items: [
          {
            name: "benchpress",
            endpoint: true,
            yes_or_no_input: true,
            numberinput: true,
          },
          {
            name: "incline_press",
            endpoint: true,
            yes_or_no_input: true,
            numberinput: true,
            textinput: true,
          },
        ],
      },
      {
        name: "shoulder",
        endpoint: true,
        radioinput: true,
        numberinput: true,
      },
      {
        name: "back",
        endpoint: false,
      },
      {
        name: "legs",
        items: [
          {
            name: "squats",
            endpoint: true,
            yes_or_no_input: true,
            numberinput: true,
          },
          {
            name: "deadlifts",
            endpoint: true,
            yes_or_no_input: true,
            numberinput: true,
            radioinput: true,
          },
        ],
      },
    ],
  },
  {
    category: "meal",
    sections: [
      {
        name: "protein_shake",
        endpoint: true,
        yes_or_no_input: true,
        numberinput: true,
      },
      {
        name: "breakfast",
        endpoint: true,
        yes_or_no_input: true,
        textinput: true,
      },
      {
        name: "lunch",
        endpoint: true,
        yes_or_no_input: true,
        textinput: true,
        radioinput: true,
      },
      {
        name: "dinner",
        endpoint: true,
        yes_or_no_input: true,
        textinput: true,
      },
      {
        name: "snacks",
        items: [
          {
            name: "fruits",
            endpoint: true,
            yes_or_no_input: true,
            numberinput: true,
          },
          {
            name: "nuts",
            endpoint: true,
            yes_or_no_input: true,
            textinput: true,
          },
        ],
      },
    ],
  },
]
