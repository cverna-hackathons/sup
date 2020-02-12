package types

type Author struct {
		Name string `json:"name"`
		ForeignId string `json:"foreignId"`
}

type Size struct {
		Width float64 `json:"width"`
		Height float64 `json:"height"`
		Unit string `json:"unit"`
}

// Entry which is saved by data-mine
type Entry struct {
    ImagePublicUrl string `json:"imagePublicUrl"`
    Materials []string `json:"materials"`
    Medias []string `json:"medias"`
    Subjects []string `json:"subjects"`
    Styles []string `json:"styles"`
    Size Size `json:"size"`
    Title string `json:"title"`
    Country string `json:"country"`
		Price float64 `json:"price"`
		Author Author `json:"author"`
}