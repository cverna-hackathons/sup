package main

import "fmt"
import "net/http"
import "bytes"

func main() {
    resp, _ := http.Get("https://www.saatchiart.com/paintings/fine-art")
    buf := new(bytes.Buffer)
    buf.ReadFrom(resp.Body)
	fmt.Println(buf.String())
}
