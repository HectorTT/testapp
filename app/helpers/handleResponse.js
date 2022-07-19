const handleResponse = {
    error: (data, res = null) => {
      const response = data;
  
      //logger.error(parseObject(response, null, 2));
  
      if (res) return res.status(response.statusCode || 500).send(response);
  
      return response;
    },
    success: (data, res) => {
      const response = data;
  
      if (res) return res.status(response.statusCode || 200).send(response);
  
      return response;
    },
  };
  
module.exports = handleResponse;