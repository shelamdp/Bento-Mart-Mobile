import { gql } from '@apollo/client';


export const GET_MENUS = gql`
query Menus {
  getAllMenus {
    id
    name
    price
    imgUrl
  }
}
`

export const GET_DETAIL = gql`
query Menus($getDetailMenuId: ID) {
  getDetailMenu(id: $getDetailMenuId) {
    id
    name
    imgUrl
    username
    price
    description
    Ingredients {
      name
    }
    Category {
      name
    }
  }
}
`

export const GET_CATEGORIES = gql`
query GetAllCategories {
  getAllCategories {
    name
  }
}
`