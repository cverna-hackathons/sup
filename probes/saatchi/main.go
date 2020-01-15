package main

import "fmt"
import "net/http"
import "bytes"
import "regexp"

func main() {
    var hostIdRegexp = regexp.MustCompile(`applicationId\"\:\"(?P<id>.*)\"\,\"nextApp`)

    resp, _ := http.Get("https://www.saatchiart.com/paintings/fine-art")
    buf := new(bytes.Buffer)
    buf.ReadFrom(resp.Body)

    var responseString = buf.String()
    var hostId = hostIdRegexp.FindStringSubmatch(responseString)

    fmt.Println(hostId[1])
	// fmt.Println(responseString)
}
