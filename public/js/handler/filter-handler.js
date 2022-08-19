const filterHandler = {
  "color": (a) => {
    return (p) => {
      return p.filter[0].color == a
    }
  }
}

export default filterHandler;