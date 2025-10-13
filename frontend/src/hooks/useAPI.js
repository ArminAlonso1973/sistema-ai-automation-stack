// src/hooks/useAPI.js - Hook reutilizable para API calls
import { useState, useEffect } from 'react'
import { api } from '../config/api'

export function useAPI(endpoint, autoFetch = true) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchData = async () => {
    setLoading(true)
    setError(null)
    try {
      const result = await api.get(endpoint)
      setData(result)
    } catch (err) {
      setError(err.message)
      console.error('Error fetching data:', err)
    } finally {
      setLoading(false)
    }
  }

  const postData = async (payload) => {
    setLoading(true)
    setError(null)
    try {
      const result = await api.post(endpoint, payload)
      setData(result)
      return result
    } catch (err) {
      setError(err.message)
      console.error('Error posting data:', err)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const putData = async (payload) => {
    setLoading(true)
    setError(null)
    try {
      const result = await api.put(endpoint, payload)
      setData(result)
      return result
    } catch (err) {
      setError(err.message)
      console.error('Error updating data:', err)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const deleteData = async () => {
    setLoading(true)
    setError(null)
    try {
      const result = await api.delete(endpoint)
      setData(result)
      return result
    } catch (err) {
      setError(err.message)
      console.error('Error deleting data:', err)
      throw err
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (autoFetch) {
      fetchData()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endpoint, autoFetch])

  const refetch = () => {
    fetchData()
  }

  return { 
    data, 
    loading, 
    error, 
    refetch,
    post: postData,
    put: putData,
    delete: deleteData
  }
}