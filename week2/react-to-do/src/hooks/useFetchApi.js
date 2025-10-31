import { useEffect, useState } from "react"

export default function useFetchApi(url) {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [fetched, setFetched] = useState(false)

  async function loadData() {
    try {
      setLoading(true)
      const res = await fetch(url)
      const result = await res.json()
      setData(result.data)
      setFetched(true)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  return { data, setData, loading, fetched }
}
