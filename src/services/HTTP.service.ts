import axios from 'axios';
import { AsyncStorageService } from './AsynStorage.service';
import { encodedDisorders } from '../constants/encodedDisorders';

interface PredictMentalDisorderPostRequestPayload {
  features: number[];
}

interface AnalyzeText {
  text: string;
}

export class HTTPService {
  static axiosInstance = axios.create({
    baseURL: ' https://deciding-strictly-lark.ngrok-free.app', // Replace with your actual localhost port if different
    headers: {
      'Content-Type': 'application/json'
    }
  });
  static getDisorderPredictions = async (
    encodedFeatures: PredictMentalDisorderPostRequestPayload
  ) => {
    console.log(encodedFeatures.features);
    try {
      const response = await this.axiosInstance.post('/predict_disorder', {
        features: encodedFeatures.features
      });
      const decodedDisorder = encodedDisorders[response.data.prediction];
      AsyncStorageService.setData('VSDisorder', decodedDisorder);
    } catch (error) {
      console.error('Error posting data:', error);
    }
  };

  static analyzePostText = async (text: string) => {
    try {
      const response = await this.axiosInstance.post('/analyze_text', {
        text: text
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error('Error posting data:', error);
    }
  };

  static analyzeAudio = async (
    audio_frequency: number,
    audioFile: File | string
  ) => {
    try {
      const response = await this.axiosInstance.post('/analyze_audio', {
        audio_frequency: audio_frequency
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error('Error posting data:', error);
    }
  };

  static getRecommendedExercises = async (
    encodedFeatures: PredictMentalDisorderPostRequestPayload
  ) => {
    console.log(encodedFeatures.features);
    try {
      const response = await this.axiosInstance.post('/get_recommendation', {
        features: encodedFeatures.features
      });
    } catch (error) {
      console.error('Error posting data:', error);
    }
  };
}
