import Mock from 'mockjs'
import { doCustomTimes } from '@/libs/util'

const Random = Mock.Random

let pool = {
  name1: '筷子',
  name2: '勺子',
  name3: '碗',
  name4: '杯子',
  name5: '不知道'
}

export const getProductApi = req => {
  let tableData = []
  doCustomTimes(5, () => {
    tableData.push(Mock.mock({
      id: Random.natural(0, 4),
      name: Random.string(pool, 1, 3),
      count: Random.natural(100, 1000)
    }))
  })
  return tableData
}
