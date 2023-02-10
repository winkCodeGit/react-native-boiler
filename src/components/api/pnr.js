import { AjaxService } from "../utils/AjaxService";
export const getTrainDetails = (params) => {
    return AjaxService.get(
        `https://indian-railway-irctc.p.rapidapi.com/getTrainId`,
      
      //{id: '2519', date: 'Mon, 31st Dec'},
      {trainno:params.trainNo},
      {
        'X-RapidAPI-Key': '2e9ce54958msh95ec274bef30004p1970e0jsna6578a56e134',
        'X-RapidAPI-Host': 'indian-railway-irctc.p.rapidapi.com'
      },
    ).then(
      (res) => res.data,
      (error) => {
        if(error.response){
          throw error.response.data;
        }else{
          throw 'service Failed'
        }
      }
    );
  };



  export const getLiveDetails = (params) => {
    return AjaxService.get(
    `https://indian-railway-irctc.p.rapidapi.com/getTrainLiveStatusById`,
      {id: params.id, date: params.date},
      {
        'X-RapidAPI-Key': '2e9ce54958msh95ec274bef30004p1970e0jsna6578a56e134',
        'X-RapidAPI-Host': 'indian-railway-irctc.p.rapidapi.com'
      },
    ).then(
      (res) => res.data,
      (error) => {
        if(error.response){
          throw error.response.data;
        }else{
          throw 'service Failed'
        }
      }
    );
  };

