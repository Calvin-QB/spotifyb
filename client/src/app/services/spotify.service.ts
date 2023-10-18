import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ArtistData } from '../data/artist-data';
import { AlbumData } from '../data/album-data';
import { TrackData } from '../data/track-data';
import { ResourceData } from '../data/resource-data';
import { ProfileData } from '../data/profile-data';
import { TrackFeature } from '../data/track-feature';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  expressBaseUrl: string = 'http://localhost:8888';

  constructor(private http: HttpClient) { }

  private sendRequestToExpress(endpoint: string): Promise<any> {
    //TODO: use the injected http Service to make a get request to the Express endpoint and return the response.
    //the http service works similarly to fetch(). It may be useful to call .toPromise() on any responses.
    //update the return to instead return a Promise with the data from the Express server
    var promise = this.http.get(this.expressBaseUrl+endpoint).toPromise();
    return Promise.resolve(promise);
  }

  aboutMe(): Promise<ProfileData> {
    //This line is sending a request to express, which returns a promise with some data. We're then parsing the data 
    return this.sendRequestToExpress('/me').then((data) => {
      return new ProfileData(data);
    });
  }

  searchFor(category: string, resource: string): Promise<ResourceData[]> {
    //TODO: identify the search endpoint in the express webserver (routes/index.js) and send the request to express.
    //Make sure you're encoding the resource with encodeURIComponent().
    //Depending on the category (artist, track, album), return an array of that type of data.
    //JavaScript's "map" function might be useful for this, but there are other ways of building the array.
    var encoded = encodeURIComponent(resource);
    if (category == "artist"){
      var artistArray:ArtistData[];
      return this.sendRequestToExpress('/search/'+category+'/'+encoded).then((data) =>{
        console.log("The artist data: ");
        console.log(data);
        artistArray = data["artists"]["items"].map(item => {return new ArtistData(item)});
        
        return artistArray;
      });
    }

    if (category == "track"){
      var TrackArray:TrackData[];
      return this.sendRequestToExpress('/search/'+category+'/'+encoded).then((data) =>{
        console.log("The track data: ");
        console.log(data);
        TrackArray = data["tracks"]["items"].map(item => {return new TrackData(item)});
        
        
        return TrackArray;
      });
    }


    if (category == "album"){
      var albumArray:AlbumData[];
      return this.sendRequestToExpress('/search/'+category+'/'+encoded).then((data) =>{
        console.log("The album data: ");
        console.log(data);
        albumArray = data["albums"]["items"].map(item => {return new AlbumData(item)});
        
        return albumArray;
      });
    }
    console.log("Uncaught error in searchFor service");
    return null;


  }

  getArtist(artistId: string): Promise<ArtistData> {
    //TODO: use the artist endpoint to make a request to express.
    //Again, you may need to encode the artistId.
    var encoded = encodeURIComponent(artistId);

    return this.sendRequestToExpress("/artist/" + encoded).then((data) => {
      return new ArtistData(data);
    }) 
  }

  getRelatedArtists(artistId: string): Promise<ArtistData[]> {
    //TODO: use the related artist endpoint to make a request to express and return an array of artist data.
    return this.sendRequestToExpress("/artist-related-artists/" + artistId).then((data) => {
      var relatedArray:ArtistData[];
      relatedArray = data["artists"].map(item => {return new ArtistData(item)});
      return relatedArray;
    }) 
  }

  getTopTracksForArtist(artistId: string): Promise<TrackData[]> {
    //TODO: use the top tracks endpoint to make a request to express.
    return this.sendRequestToExpress("/artist-top-tracks/" + artistId).then((data) =>{
      var topTracks:TrackData[];
      topTracks = data["tracks"].map((item) => {return new TrackData(item)});
      return topTracks;
    })
  }

  getAlbumsForArtist(artistId: string): Promise<AlbumData[]> {
    //TODO: use the albums for an artist endpoint to make a request to express.
    return this.sendRequestToExpress("/artist-albums/" + artistId).then((data) =>{
      var albumArray:AlbumData[];
      albumArray = data["items"].map((item) => {return new AlbumData(item)});
      return albumArray;
    })
  }

  getAlbum(albumId: string): Promise<AlbumData> {
    return this.sendRequestToExpress("/album/" + albumId).then((data) =>{
      return new AlbumData(data);
    })
  }

  getTracksForAlbum(albumId: string): Promise<TrackData[]> {
    return this.sendRequestToExpress("/album-tracks/" + albumId).then((data) =>{
      var trcks:TrackData[];
      trcks = data["items"].map((item) => {return new TrackData(item)});
      return trcks;
    })
  }

  getTrack(trackId: string): Promise<TrackData> {
    return this.sendRequestToExpress("/track/" + trackId).then((data) =>{
      return new TrackData(data);
    })
  }

  getAudioFeaturesForTrack(trackId: string): Promise<TrackFeature[]> {
    //TODO: use the audio features for track endpoint to make a request to express.
    return this.sendRequestToExpress("/track-audio-features/" + trackId).then((data) =>{
      //console.log(data);
      var tf:TrackFeature[];
      tf = TrackFeature.FeatureTypes.map((item) => {return new TrackFeature(item, data[item]);});
      return tf;
    })
  }
}
