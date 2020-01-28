package main

import "fmt"
import "regexp"
import "strings"
import "encoding/json"
import "strconv"
import "os"

// go get github.com/imroc/req
import "github.com/imroc/req"

const ROOT_URL = "https://www.saatchiart.com/paintings/fine-art"
const ROOT_API_URL = "-dsn.algolia.net/1/indexes/production_all_artworks/query"
const RE_APPLICATION_ID = `applicationId\"\:\"(?P<id>.*)\"\,\"nextApp`
const RE_API_KEY = `searchApi\"\:\"(?P<id>.*)\"\,\"searchIndice`
const HITS_PER_FILE = 10000
const DATA_DIR = "./data/"

type ApiResponse struct {
	Hits []*json.RawMessage
}

func checkErr(err error) {
    if err != nil {
        fmt.Println(err)
    }
}

func getRegexGroupValue(response string, regexString string) string {
    var regex = regexp.MustCompile(regexString)
    return regex.FindStringSubmatch(response)[1]
}

func getKeys() (string, string) {
    r, _ := req.Get(ROOT_URL)
    body := r.String()
    return getRegexGroupValue(body, RE_APPLICATION_ID), getRegexGroupValue(body, RE_API_KEY)
}

func getApiQueryUrl(appId string) string {
    return "https://" + strings.ToLower(appId) + ROOT_API_URL
}

func getQueryParams(appId string, apiKey string) req.QueryParam {
    return req.QueryParam {
        "x-algolia-application-id": appId,
        "x-algolia-api-key": apiKey,
    }
}

func getParams(page int, category string) req.Param {
    return req.Param {
        "filters": "(category:\"" + category +"\")",
        "hitsPerPage": HITS_PER_FILE,
        "page": page,
    }
}

func getFileName(category string, page int) string {
    actualCount := page * HITS_PER_FILE
    return DATA_DIR + strings.ToUpper(category) + "/" + strconv.Itoa(actualCount) + "-" + strconv.Itoa(actualCount + HITS_PER_FILE) + ".json"
}

func downloadPartToFile(apiUrl string, queryParams req.QueryParam, category string, page int) {
    var apiResponse ApiResponse
    r, err := req.Post(apiUrl, req.BodyJSON(getParams(page, category)), queryParams)
    checkErr(err)
    r.ToJSON(&apiResponse)
    j, _ := json.Marshal(&apiResponse.Hits)
    f, err := os.Create(getFileName(category, page - 1))
    checkErr(err)
    f.WriteString(string(j))
    f.Sync()
    f.Close()
}

func downloadCategory(category string, startPage int, pageCount int) {
    err := os.MkdirAll(DATA_DIR + strings.ToUpper(category), 0700)
    checkErr(err)

    appId, apiKey := getKeys()
    apiUrl := getApiQueryUrl(appId)
    queryParams := getQueryParams(appId, apiKey)

    for page := startPage; page < startPage + pageCount; page++ {
        downloadPartToFile(apiUrl, queryParams, category, page)
    }
}

func main() {
    downloadCategory("Paintings", 1, 200)
}
