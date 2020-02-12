package types

// Entry which is received from saatchi API
// This is transformed to Entry via transform
type SaatchiRecord struct {
		Image_url string
		Width float64
		Height float64
		Materials []string
		All_mediums []string
		All_subject string
		All_styles []string
		Artwork_title string
		Country string
		Price int
		First_name string
		Last_name string
		Id_user int
}