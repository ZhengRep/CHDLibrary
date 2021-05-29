import CustomPage from '../../../../utils/WeUI/CustomPage'
const app = getApp()

CustomPage({
  data: {
    vtabs : [
      {
        "title": "一楼",
        "startTime":"22:30",
        "endTime":"8:30",
        "isReserve":true,
        "room":[
          "一楼自习区"
        ],
        "seat":[
          [8,8,
            [0,0,1,0,2,0,1,0],
            [
              [0,0,0,0,1,0,0,0],
              [0,0,0,0,1,0,0,0],
              [0,0,0,0,1,0,0,0],
              [0,0,0,0,1,0,0,0],
              [0,0,0,0,1,0,0,0],
              [0,0,0,0,1,0,0,0],
              [0,0,0,0,1,0,0,0],
              [0,0,0,0,1,0,0,0],
            ]
          ],
        ],
      },
      {
        "title": "二楼",
        "startTime":"22:30",
        "endTime":"8:30",
        "isReserve":true,
        "room": [
          "212-214",
          "202-203",
          "209-211",
          "206-207",
        ],
        "seat": [
          [28,8,
            [
              0,0,1,0,1,0,1,0,1,0,
              1,0,2,0,1,0,1,0,1,0,
              1,0,1,0,1,0,1,0
            ],
            [
              [0,0,0,0,0,0,1,0],
              [0,0,0,0,0,0,1,0],
              [0,0,0,0,0,0,1,0],
              [0,0,0,0,0,0,1,0],
              [0,0,0,0,0,0,1,0],
              [0,0,0,0,0,0,1,0],
              [0,0,0,0,0,0,1,0],
              [0,0,0,0,0,0,1,0],
              [0,0,0,0,0,0,1,0],
              [0,0,0,0,0,0,1,0],
              [0,0,0,0,0,0,1,0],
              [0,0,0,0,0,0,1,0],
              [0,0,0,0,0,0,1,0],
              [0,0,0,0,0,0,1,0],
              [0,0,0,0,0,0,1,0],
              [0,0,0,0,0,0,1,0],
              [0,0,0,0,0,0,1,0],
              [0,0,0,0,0,0,1,0],
              [0,0,0,0,0,0,1,0],
              [0,0,0,0,0,0,1,0],
              [0,0,0,0,0,0,1,0],
              [0,0,0,0,0,0,1,0],
              [0,0,0,0,0,0,1,0],
              [0,0,0,0,0,0,1,0],
              [0,0,0,0,0,0,1,0],
              [0,0,0,0,0,0,1,0],
              [2,2,2,2,2,2,1,0],
              [2,2,2,2,2,2,1,0],
              
            ]
          ],

          [10,8,
            [
              0,0,1,0,1,0,1,0,1,0
            ],
            [
              [2,2,2,2,1,0,0,0],
              [2,2,2,2,1,0,0,0],
              [0,0,0,0,1,0,0,0],
              [0,0,0,0,1,0,0,0],
              [0,0,2,2,3,2,0,0],
              [0,0,2,2,3,2,0,0],
              [0,0,0,0,1,0,0,0],
              [0,0,0,0,1,0,0,0],
              [2,2,2,2,1,0,0,0],
              [2,2,2,2,1,0,0,0]
            ]
          ],

          [26,8,
            [
              0,0,1,0,1,0,1,0,1,0,
              1,0,1,0,2,0,1,0,1,0,
              1,0,1,0,1,0
            ],
            [
              [0,0,0,0,0,0,1,0],
              [0,0,0,0,0,0,1,0],
              [0,0,0,0,0,0,1,0],
              [0,0,0,0,0,0,1,0],
              [0,0,0,0,0,0,1,0],
              [0,0,0,0,0,0,1,0],
              [0,0,0,0,0,0,1,0],
              [0,0,0,0,0,0,1,0],
              [0,0,0,0,0,0,1,0],
              [0,0,0,0,0,0,1,0],

              [0,0,0,0,0,0,1,0],
              [0,0,0,0,0,0,1,0],
              [0,0,0,0,0,0,3,2],
              [0,0,0,0,0,0,3,2],
              [0,0,0,0,0,0,1,0],
              [0,0,0,0,0,0,1,0],
              [0,0,0,0,0,0,1,0],
              [0,0,0,0,0,0,1,0],
              [0,0,0,0,0,0,1,0],
              [0,0,0,0,0,0,1,0],
              [0,0,0,0,0,0,1,0],
              [0,0,0,0,0,0,1,0],
              [0,0,0,0,0,0,1,0],
              [0,0,0,0,0,0,1,0],
              [0,0,0,0,0,0,3,2],
              [0,0,0,0,0,0,3,2],
              
            ]
          ],
          
          [12,6,
            [0,0,1,0,1,0,1,0,1,0,
              1,0
            ],
            [
              [2,2,1,0,0,0],
              [2,2,1,0,0,0],
              [0,0,1,0,0,0],
              [0,0,1,0,0,0],
              [0,0,1,0,0,0],
              [0,0,1,0,0,0],
              [0,0,1,0,0,0],
              [0,0,1,0,0,0],
              [2,2,1,0,0,0],
              [2,2,1,0,0,0],
              [2,2,1,0,0,0],
              [2,2,1,0,0,0],
            ]
          ],
        ],
      },
      {
        "title": "四楼",
        "startTime":"22:30",
        "endTime":"8:30",
        "isReserve":true,
        "room": [
          "416-417",
          "410-411"
        ],
        "seat": [
          [24,10,
             [0,0,1,0,1,0,1,0,1,0,
              1,0,1,0,1,0,1,0,1,0,
              1,0,1,0],
              [
                [0,0,1,0,0,0,0,0,1,0],
                [0,0,1,0,0,0,0,0,1,0],
                [0,0,1,0,0,0,0,0,1,0],
                [0,0,1,0,0,0,0,0,1,0],
                [0,0,1,0,0,0,0,0,1,0],
                [0,0,1,0,0,0,0,0,1,0],
                [0,0,1,0,0,0,0,0,1,0],
                [0,0,1,0,0,0,0,0,1,0],
                [0,0,1,0,0,0,0,0,1,0],
                [0,0,1,0,0,0,0,0,1,0],
                [0,0,1,0,0,0,0,0,1,0],
                [0,0,1,0,0,0,0,0,1,0],
                [0,0,1,0,0,0,0,0,1,0],
                [0,0,1,0,0,0,0,0,1,0],
                [0,0,1,0,0,0,0,0,1,0],
                [0,0,1,0,0,0,0,0,1,0],
                [0,0,1,0,0,0,0,0,1,0],
                [0,0,1,0,0,0,0,0,1,0],
                [0,0,1,0,0,0,0,0,1,0],
                [0,0,1,0,0,0,0,0,1,0],
                [2,2,3,2,2,2,2,2,1,0],
                [2,2,3,2,2,2,2,2,1,0],
                [2,2,3,2,2,2,2,2,1,0],
                [2,2,3,2,2,2,2,2,1,0]
              ]
          ],
          [10,6,
              [0,0,1,0,1,0,1,0,1,0],
              [
                [0,0,1,0,1,0],
                [0,0,1,0,1,0],
                [2,2,1,0,1,0],
                [2,2,1,0,1,0],
                [0,0,1,0,1,0],
                [0,0,1,0,1,0],
                [0,0,1,0,1,0],
                [0,0,1,0,1,0],
                [0,0,1,0,1,0],
                [0,0,1,0,1,0]
              ]
          ],
        ],
      },
      {
        "title": "五楼",
        "startTime":"22:30",
        "endTime":"8:30",
        "isReserve":true,
        "room": [
          "516-517",
          "研习室",
          "514-515"
        ],
        "seat": [
          [18,10,
              [ 0,0,1,0,1,0,1,0,1,0,
                1,0,1,0,1,0,1,0],
            [
                [0,0,1,0,0,0,0,0,1,0],
                [0,0,1,0,0,0,0,0,1,0],
                [0,0,1,0,0,0,0,0,1,0],
                [0,0,1,0,0,0,0,0,1,0],
                [0,0,1,0,0,0,0,0,1,0],
                [0,0,1,0,0,0,0,0,1,0],
                [0,0,1,0,0,0,0,0,1,0],
                [0,0,1,0,0,0,0,0,1,0],
                [0,0,1,0,0,0,0,0,1,0],
                [0,0,1,0,0,0,0,0,1,0],
                [0,0,1,0,0,0,0,0,1,0],
                [0,0,1,0,0,0,0,0,1,0],
                [0,0,1,0,0,0,0,0,1,0],
                [0,0,1,0,0,0,0,0,1,0],
                [0,0,1,0,0,0,0,0,3,2],
                [0,0,1,0,0,0,0,0,3,2],
                [0,0,1,0,0,0,0,0,3,2],
                [0,0,1,0,0,0,0,0,3,2]
            ]
          ],
          [6,4,
            [0,0,1,0,1,0],
            [
              [0,0,1,0],
              [0,0,1,0],
              [0,0,1,0],
              [0,0,1,0],
              [0,0,1,0],
              [0,0,1,0]
            ]
          ],
          [20,10,
              [ 0,0,1,0,1,0,1,0,1,0,
                1,0,1,0,1,0,1,0,1,0],
              [
                [0,0,1,0,0,0,0,0,1,0],
                [0,0,1,0,0,0,0,0,1,0],
                [0,0,1,0,0,0,0,0,1,0],
                [0,0,1,0,0,0,0,0,1,0],
                [0,0,1,0,0,0,0,0,1,0],
                [0,0,1,0,0,0,0,0,1,0],
                [0,0,1,0,0,0,0,0,1,0],
                [0,0,1,0,0,0,0,0,1,0],
                [0,0,1,0,0,0,0,0,1,0],
                [0,0,1,0,0,0,0,0,1,0],
                [0,0,1,0,0,0,0,0,1,0],
                [0,0,1,0,0,0,0,0,1,0],
                [0,0,1,0,0,0,0,0,1,0],
                [0,0,1,0,0,0,0,0,1,0],
                [0,0,1,0,0,0,0,0,1,0],
                [0,0,1,0,0,0,0,0,1,0],
                [0,0,1,0,0,0,0,0,1,0],
                [0,0,1,0,0,0,0,0,1,0],
                [0,0,1,0,0,0,0,0,3,2],
                [0,0,1,0,0,0,0,0,3,2]
                
              ]
          ],
        ],
      },
      {
        "title": "六楼",
        "startTime":"22:30",
        "endTime":"8:30",
        "isReserve":true,
        "room": [
          "610-611",
          "608-609",
        ],
        "seat": [
          [20,8,
              [ 0,0,1,0,1,0,1,0,1,0,
                1,0,1,0,1,0,1,0,1,0
              ],
              [
                [0,0,1,0,0,0,1,0],
                [0,0,1,0,0,0,1,0],
                [0,0,1,0,0,0,1,0],
                [0,0,1,0,0,0,1,0],
                [0,0,1,0,0,0,1,0],
                [0,0,1,0,0,0,1,0],
                [0,0,1,0,0,0,1,0],
                [0,0,1,0,0,0,1,0],
                [0,0,1,0,0,0,1,0],
                [0,0,1,0,0,0,1,0],
                [0,0,1,0,0,0,1,0],
                [0,0,1,0,0,0,1,0],
                [2,2,1,0,0,0,1,0],
                [2,2,1,0,0,0,1,0],
                [2,2,1,0,0,0,1,0],
                [2,2,1,0,0,0,1,0],
                [2,2,1,0,0,0,1,0],
                [2,2,1,0,0,0,1,0],
                [2,2,1,0,0,0,1,0],
                [2,2,1,0,0,0,1,0]
              ]
          ],
          [20,10,
              [0,0,1,0,1,0,1,0,1,0,
                1,0,1,0,1,0,1,0,1,0],
              [
                [2,2,1,0,0,0,2,2,1,0],
                [2,2,1,0,0,0,2,2,1,0],
                [2,2,1,0,0,0,0,0,1,0],
                [2,2,1,0,0,0,0,0,1,0],
                [2,2,1,0,0,0,2,2,1,0],
                [2,2,1,0,0,0,2,2,1,0],
                [0,0,1,0,0,0,0,0,1,0],
                [0,0,1,0,0,0,0,0,1,0],
                [0,0,1,0,0,0,0,0,1,0],
                [0,0,1,0,0,0,0,0,1,0],

                [0,0,1,0,0,0,2,2,1,0],
                [0,0,1,0,0,0,2,2,1,0],
                [0,0,1,0,0,0,0,0,1,0],
                [0,0,1,0,0,0,0,0,1,0],
                [0,0,1,0,0,0,0,0,1,0],
                [0,0,1,0,0,0,0,0,1,0],
                [0,0,1,0,0,0,0,0,1,0],
                [0,0,1,0,0,0,0,0,1,0],
                [2,2,3,2,2,2,2,2,1,0],
                [2,2,3,2,2,2,2,2,1,0]
              ]
          ]
        ],
      },
      {
        "title": "七楼",
        "startTime":"22:30",
        "endTime":"8:30",
        "isReserve":true,
        "room": [
          "710-711",
          "研习室",
          "708-709"
        ],
        "seat": [
          [18,10,
              [0,0,1,0,1,0,1,0,1,0,
                1,0,1,0,1,0,1,0],
              [
                [0,0,1,0,0,0,0,0,1,0],
                [0,0,1,0,0,0,0,0,1,0],
                [0,0,1,0,0,0,0,0,1,0],
                [0,0,1,0,0,0,0,0,1,0],
                [0,0,1,0,0,0,0,0,1,0],
                [0,0,1,0,0,0,0,0,1,0],
                [0,0,1,0,0,0,0,0,1,0],
                [0,0,1,0,0,0,0,0,1,0],
                [0,0,1,0,0,0,2,2,1,0],
                [0,0,1,0,0,0,2,2,1,0],

                [0,0,1,0,0,0,0,0,1,0],
                [0,0,1,0,0,0,0,0,1,0],
                [0,0,1,0,0,0,2,2,1,0],
                [0,0,1,0,0,0,2,2,1,0],
                [0,0,1,0,0,0,0,0,1,0],
                [0,0,1,0,0,0,0,0,1,0],
                [0,0,1,0,0,0,0,0,1,0],
                [0,0,1,0,0,0,0,0,1,0]
              ]
          ],
          [6,4,
            [0,0,1,0,1,0],
            [
              [0,0,1,0],
              [0,0,1,0],
              [0,0,1,0],
              [0,0,1,0],
              [0,0,1,0],
              [0,0,1,0]
            ]
          ],
          [18,10,
            [0,0,1,0,1,0,1,0,1,0,
              1,0,1,0,1,0,1,0],
            [
              [2,2,1,0,0,0,0,0,1,0],
              [2,2,1,0,0,0,0,0,1,0],
              [2,2,1,0,0,0,0,0,1,0],
              [2,2,1,0,0,0,0,0,1,0],
              [2,2,1,0,0,0,0,0,1,0],
              [2,2,1,0,0,0,0,0,1,0],
            
              [0,0,1,0,0,0,0,0,1,0],
              [0,0,1,0,0,0,0,0,1,0],
              [0,0,1,0,0,0,0,0,1,0],
              [0,0,1,0,0,0,0,0,1,0],
              

              [0,0,1,0,0,0,0,0,1,0],
              [0,0,1,0,0,0,0,0,1,0],
              [0,0,1,0,0,0,0,0,1,0],
              [0,0,1,0,0,0,0,0,1,0],
              [0,0,1,0,0,0,0,0,1,0],
              [0,0,1,0,0,0,0,0,1,0],
              [0,0,1,0,0,0,0,0,1,0],
              [0,0,1,0,0,0,0,0,1,0]
            ]
        ],
        ],
      },
      {
        "title": "八楼",
        "startTime":"22:30",
        "endTime":"8:30",
        "isReserve":true,
        "room": [
          "811",
          "809-810",

        ],
        "seat": [
          [16,10,
              [0,0,1,0,1,0,1,0,1,0,
                1,0,1,0,1,0],
              [
                [0,0,1,0,0,0,0,0,1,0],
                [0,0,1,0,0,0,0,0,1,0],
                [0,0,1,0,0,0,0,0,1,0],
                [0,0,1,0,0,0,0,0,1,0],
                [0,0,1,0,0,0,0,0,1,0],
                [0,0,1,0,0,0,0,0,1,0],
                [0,0,1,0,0,0,0,0,1,0],
                [0,0,1,0,0,0,0,0,1,0],
                [0,0,1,0,0,0,0,0,1,0],
                [0,0,1,0,0,0,0,0,1,0],
                [0,0,1,0,0,0,0,0,1,0],
                [0,0,1,0,0,0,0,0,1,0],
                [0,0,1,0,0,0,0,0,1,0],
                [0,0,1,0,0,0,0,0,1,0],
                [0,0,1,0,0,0,0,0,1,0],
                [0,0,1,0,0,0,0,0,1,0]
              ]
          ],
          [16,10,
              [0,0,1,0,1,0,1,0,1,0,
                1,0,1,0,1,0],
              [
                [0,0,1,0,0,0,0,0,1,0],
                [0,0,1,0,0,0,0,0,1,0],
                [0,0,1,0,0,0,0,0,1,0],
                [0,0,1,0,0,0,0,0,1,0],
                [0,0,1,0,0,0,0,0,1,0],
                [0,0,1,0,0,0,0,0,1,0],
                [0,0,1,0,0,0,0,0,1,0],
                [0,0,1,0,0,0,0,0,1,0],
                [0,0,1,0,0,0,0,0,1,0],
                [0,0,1,0,0,0,0,0,1,0],
                [0,0,1,0,0,0,0,0,1,0],
                [0,0,1,0,0,0,0,0,1,0],
                [0,0,1,0,0,0,0,0,1,0],
                [0,0,1,0,0,0,0,0,1,0],
                [0,0,1,0,0,0,0,0,1,0],
                [0,0,1,0,0,0,0,0,1,0]
              ]
          ],
        ]
      },
      {
        "title": "九楼",
        "startTime":"22:30",
        "endTime":"8:30",
        "isReserve":true,
        "room": [
          "916-917",
          "902-903",
          "914-915",
          "912-913",
          "911",
          "电子阅览室"
        ],
        "seat": [
          [12,6,
            [0,0,1,0,1,0,1,0,1,0,
              1,0],
            [
              [0,0,0,0,1,0],
              [0,0,0,0,1,0],
              [0,0,0,0,1,0],
              [0,0,0,0,1,0],
              [0,0,0,0,1,0],
              [0,0,0,0,1,0],
              [0,0,0,0,1,0],
              [0,0,0,0,1,0],
              [0,0,0,0,1,0],
              [0,0,0,0,1,0],
              [0,0,0,0,1,0],
              [0,0,0,0,1,0]
            ]
          ],
          [12,6,
            [0,0,1,0,1,0,1,0,1,0,
              1,0],
            [
                [0,0,1,0,1,0],
                [0,0,1,0,1,0],
                [0,0,1,0,1,0],
                [0,0,1,0,1,0],
                [0,0,1,0,1,0],
                [0,0,1,0,1,0],
                [0,0,1,0,1,0],
                [0,0,1,0,1,0],
                [0,0,1,0,1,0],
                [0,0,1,0,1,0],
                [2,2,1,0,1,0],
                [2,2,1,0,1,0]
            ]
          ],
          [10,8,
            [0,0,1,0,1,0,1,0,1,0],
            [
              [0,0,0,0,1,0,0,0],
              [0,0,0,0,1,0,0,0],
              [0,0,0,0,1,0,0,0],
              [0,0,0,0,1,0,0,0],
              [0,0,0,0,1,0,0,0],
              [0,0,0,0,1,0,0,0],
              [0,0,0,0,1,0,0,0],
              [0,0,0,0,1,0,0,0],
              [0,0,0,0,1,0,0,0],
              [0,0,0,0,1,0,0,0]
            ]
          ],
          [12,12,
            [0,0,1,0,1,0,1,0,1,0,
              1,0],
            [
              [2,2,2,2,2,2,3,2,0,0,0,0],
              [2,2,2,2,2,2,3,2,0,0,0,0],

              [0,0,0,0,0,0,3,2,2,2,2,2],
              [0,0,0,0,0,0,3,2,0,0,0,0],

              [0,0,0,0,0,0,1,0,0,0,0,0],
              [0,0,0,0,0,0,1,0,0,0,0,0],
              [0,0,0,0,0,0,1,0,0,0,0,0],
              [0,0,0,0,0,0,1,0,0,0,0,0],
              [0,0,0,0,0,0,1,0,0,0,0,0],
              [0,0,0,0,0,0,1,0,0,0,0,0],
              [0,0,0,0,0,0,1,0,0,0,0,0],
              [0,0,0,0,0,0,1,0,0,0,0,0]

            ]
          ],
          [16,8,
            [0,0,1,0,1,0,1,0,1,0,
            1,0,1,0,1,0],
            [
              [0,0,1,0,0,0,1,0],
              [0,0,1,0,0,0,1,0],
              [0,0,1,0,0,0,1,0],
              [0,0,1,0,0,0,1,0],
              [0,0,1,0,0,0,1,0],
              [0,0,1,0,0,0,1,0],
              [0,0,1,0,0,0,1,0],
              [0,0,1,0,0,0,1,0],
              [0,0,1,0,0,0,1,0],
              [0,0,1,0,0,0,1,0],
              [0,0,1,0,0,0,1,0],
              [0,0,1,0,0,0,1,0],
              [0,0,1,0,0,0,1,0],
              [0,0,1,0,0,0,1,0],
              [2,2,3,2,2,2,1,0],
              [2,2,3,2,2,2,1,0]
            ]
          ],
          [16,10,
            [0,0,0,1,0,1,0,1,0,
              1,0,1,1,1,1,1],
            [
              [0,0,1,0,1,0,2,2,2,2],
              [0,0,1,0,1,0,2,2,2,2],
              [0,0,1,0,1,0,2,2,2,2],

              [0,0,0,0,0,0,0,1,0,0],
              [0,0,0,0,0,0,0,1,0,0],

              [0,0,0,0,0,0,0,1,0,0],
              [0,0,0,0,0,0,0,1,0,0],

              [0,0,0,0,0,0,0,1,0,0],
              [0,0,0,0,0,0,0,1,0,0],

              [0,0,0,0,0,0,0,1,0,0],
              [0,0,0,0,0,0,0,1,0,0],

              [0,0,0,0,0,3,2,2,2,2],
       
              [2,2,2,2,2,3,2,2,2,2],
              [2,2,2,2,2,3,2,2,2,2],
              [2,2,2,2,2,3,2,2,2,2],
              [2,2,2,2,2,3,2,2,2,2]
            ]
          ]
        ],
      }
    
    ],

    is_bind:false,
    is_teacher: false,
    user: undefined,
    floorIndex:0,
    activeTab: 0,
    vTest:1,
    click:false,
    clickroom:'',
    clickrow:-1,
    clickcol:-1,
    hasReserve:false,
    toSumb:true,
    index: 0,
    array: ['全天','上午', '下午', '晚上' ],
    showDialog: false,
    showPicker:false,
    groups: [
        { text: '姓名',values:'', value: 1 },
        { text: '学号',values:'', value: 2 },
        { text: '已选',values:'', value: 3 },
        { text: '选择时间',values:'', value: 4 },
        { text: '提交', type:'go', value: 5 }
    ],
    is_bind:false,
    is_teacher: false,
    user: undefined,
  },
  //4 部分预约  5 加1部分预约 6 全天（红色） 7 加1部分预约
  //首先请求网络更新clickrow等值，如果有预约就不让点击，没有的本就不显示
  

  onLoad(options) {
    console.log(options);
    let _this = this
    if (app.globalData.is_bind) {
      const _user = wx.getStorageSync('_user')

      _this.setData({
        'is_bind': true,
        'is_teacher': _user.type === '教职工' ? true : false
      })
      
      if (JSON.stringify(_this.data.user) !== JSON.stringify(_user)) {
        _this.setData({
          'user': _user,
          'time': wx.getStorageSync('_time')
        })
      }
    }
    this.setData({
      'groups[0].values':this.data.user.name,
      'groups[1].values':this.data.user.id,
    })
 
    
  },

  clickSeat(e){
    console.log(e);
    var seatInfo =e.currentTarget.dataset; 
    var room=seatInfo.room;
    var roomindex=seatInfo.roomindex;
    var row=seatInfo.row;
    var col=seatInfo.col;
    var floorindex = seatInfo.floorindex;
    console.log('floorindex',floorindex,'room',seatInfo.room,'roomindex',seatInfo.roomindex,'row',seatInfo.row,'col',seatInfo.col);
    var seatWrap=this.data.vtabs[floorindex].seat[roomindex];
    var detailSeat= seatWrap[3][row][col]
    if(detailSeat==0||detailSeat==1||detailSeat==4||detailSeat==5){
      this.setData({
        clickrow:row,
        clickcol:col,
        clickroom:room,
        click:!this.data.click,
      })
    }



  },


  onTabClick(e) {
    const index = e.detail.index
    console.log('tabClick', index)
  },

  onChange(e) {
    const index = e.detail.index
    this.setData({
      floorIndex:index
    })
    console.log('change', index)
  },
  handleClick() {
    wx.navigateTo({
      url: '../tabs/webview',
    })
  }, 

  closeDialog: function () {
    this.setData({
        showDialog: false
    })
},
  btnClick(e) {
      console.log(e)
      if(e.detail.value==4){
        this.setData({
          showPicker:true
        })
      }
      if(e.detail.value==5&&this.data.groups[3].values==''){
        app.showToast('请选择预约时间')
        return
      }
      if(e.detail.value==5){

        this.toReserve()
      }

  },
  selectTime(e){
    this.setData({
      'groups[3].values':this.data.array[e.detail]
    })
  },
  toReserve(){
    var floorindex=this.data.floorIndex;
    var roomindex=this.data.roomindex
    var row=this.data.clickrow
    var col=this.data.clickcol
    // var seatWrap=this.data.vtabs[floorindex].seat[roomindex][3]
    // var detail= seatWrap[3][row][col]
    app.showMaskLoading('正在提交')
    setTimeout(()=>{
      
      // if(detail==0){

      //   this.setData({
      //     'vtabs[floorindex].seat[roomindex][3][row][col]':5
      //   })
      // }else{
      //   this.setData({
      //     'vtabs[floorindex].seat[roomindex][3][row][col]':6
      //   })
      // }
      this.setData({
        showDialog:false,
        toSumb:!this.data.toSumb,
      })
      app.hideMaskLoading()
      wx.showToast({
        title: '预约成功',
      })
    },2000)
  },

  scanCodein() {
    const that = this
    wx.scanCode({
      success(res) {
        that.setData({
          result: res.result
        })
      },
      fail() {}
    })
  },
  toSumbmitReserve(){
    if(this.data.click){
      var time=this.getCurrentTime()
      var floorindex = this.data.floorIndex;
      if(!this.data.vtabs[floorindex].isReserve){
        app.showToast('此教室暂未开发放预约')
        return;
      }
      if(1){
      // if(time<this.data.vtabs[floorindex].endTime&&time>this.data.vtabs[floorindex].endTime){
          var selectRow=this.data.clickrow+1
          var selectCol=this.data.clickcol+1
          this.setData({
            'groups[2].values':this.data.clickroom+" "+selectRow+"排"+selectCol+"列",
            showDialog:true,
          })
          // this.toReserve();
          // this.setData({
          //     toSumb:!this.data.toSumb
          //   })
  
        }else{
           app.showToast('未到预约时间22:30~8:30')
        }

      
    }else{
      app.showToast('未选择座位')
    }
    
  },
  toCancelReserve(){

    this.setData({
      toSumb:!this.data.toSumb
    })

  },

  
  otherscanCode:function (options) {
    console.log(options);
    if(options.q){
      app.showToast('到options.q')
        let codeStr = decodeURIComponent(options.q)
        console.log(codeStr);
        let dataArr = codeStr.split('=')
        if(dataArr.length == 12 && 
          dataArr[0] == 'https://yiban.chd.edu.cn/api/libraryapp/library/reserveseat?seat')
          {
            let seat = dataArr[1]
            app.showToast('seat',seat)

        }
    }
  },

  onScroll(e) {
    console.log('onScroll', e)
  },
   /**
 * 获取当前时间 格式：yyyy-MM-dd HH:MM:SS
 */
    getCurrentTime:function() {
      var date = new Date();//当前时间
      var month = date.getMonth() + 1;//月
      var day = date.getDate();//日
      var hour = date.getHours();//时
      var minute = date.getMinutes();//分
      
      //当前时间
      var curTime = month + "-" + day
              + " " + hour + ":" + minute;
      
      return curTime;
      // return [curTime,date];
    },

})