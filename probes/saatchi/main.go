package main

import "fmt"
import "net/http"
import "bytes"
import "regexp"
import "strings"

func main() {
    var hostIdRegexp = regexp.MustCompile(`applicationId\"\:\"(?P<id>.*)\"\,\"nextApp`)

    resp, _ := http.Get("https://www.saatchiart.com/paintings/fine-art")
    buf := new(bytes.Buffer)
    buf.ReadFrom(resp.Body)

    var responseString = buf.String()
    var hostId = hostIdRegexp.FindStringSubmatch(responseString)[1]
    
    // posting to: https://b0ml7g848r-dsn.algolia.net/1/indexes/production_all_artworks/query
    var hostUrl = (
        "https://" + strings.ToLower(hostId) + 
        "-dsn.algolia.net/1/indexes/production_all_artworks/query" +
        "?x-algolia-application-id=" + hostId)
    
    contentResponse, _ := http.Post(hostUrl, "application/x-www-form-urlencoded")
    contentBuffer := new(bytes.Buffer)
    contentBuffer.ReadFrom(contentResponse.Body)

    responseString := contentBuffer.String()
    fmt.Println(hostUrl)
    fmt.Println(responseString)
	// fmt.Println(responseString)
}
