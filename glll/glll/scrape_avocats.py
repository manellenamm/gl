import requests
from bs4 import BeautifulSoup
from projet.models import Avocat

def scraper():
    url = 'https://avocatalgerien.com/'
    response = requests.get(url)

    if response.status_code == 200:
        soup = BeautifulSoup(response.text, 'html.parser')
        avocats_divs = soup.find_all('div', class_='membre-lawyer')

        for avocat_div in avocats_divs:
            nom_avocat = avocat_div.find('h4', class_='nom-avocat').text.strip()
            specialite = avocat_div.find('p', class_='specialite-avocat').text.strip()
            langue = avocat_div.find('p', class_='langue-avocat').text.strip()
            email = avocat_div.find('p', class_='email-avocat').text.strip()
            numero_telephone = avocat_div.find('p', class_='tel-avocat').text.strip()
            image_url = avocat_div.find('img', class_='img-fluid')['src']

            avocat = Avocat(
                username=nom_avocat,
                specialite=specialite,
                langue=langue,
                email=email,
                numero_telephone=numero_telephone,
                image=image_url,
                adresse=""
            )
            avocat.save()
    else:
        print(f"Erreur lors de la récupération de la page. Code de statut : {response.status_code}")

if __name__ == "__main__":
    scraper()