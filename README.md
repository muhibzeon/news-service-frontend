# news-service-frontend

This is a simple Angular Frontend application that is used for a news service.

### How to Run

<hr>

**Get the Code**
```
git clone https://github.com/muhibzeon/news-service-frontend.git
```

This app uses:

- Angular version `10.0.5`

- node version `14.16.0`

**Quick start**<br>
<hr>

Install Angular:
```
npm install -g angular-cli@10.0.5
```

Install dependencies:
```
cd frontend
npm install
```
Run the program:
```
ng serve
```
Run the program without auto reload:
```
ng serve --no-live-reload
```
**Functionalities**
<hr>

- Admin can view, create, edit, delete any news.
- Author can create news and edit/delete them. So to create and manage news, register as author.
- User can view content only, however only unread news will be visible to the user. The news will be no longer available after the user finished reading.

**Limitations**
<hr>

- Admin is supposed to assign role to the users. However it requires a separate admin dashboard where an Admin can see the status of all users and delete, edit or assign roles which makes the app much bigger and complicated. 
- If there are multiple authors, one author can not see the news article of other authors. The idea is that an author will have their one own account to create and manage news articles. Once they publish an article it will be available for all users. It can be tweaked easily and make all the news available to an author account. However, it seemed a bit chaotic.
