const filterHandler = {
  "color": (a) => {
    return (p) => {
      return p.filter[0].color == a
    }
  },
  "gender": (a) => {
    return (p) => {
      return p.filter[0].gender == a
    }
  }
}

export default filterHandler;