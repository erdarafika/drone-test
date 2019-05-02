import Mock from 'mockjs'

const template = [`<html>
      <body>
      <p><b>Peringatan, Unit Price belum dimasukkan ke System!</b></p>

      <p>Berikut fund yang belum memiliki unit price:<br/>
      <table>
          <thead>
          <tr>
              <td>Nama Fund</td>
              <td>Tanggal</td>
          </tr>
          </thead>
          <tbody>
          <th:block th:each="fund : funds>
              <tr>
                  <td th:text="fund.name></td>
                  <td th:text="fund.effectiveDate></td>
              </tr>
          </th:block>
          </tbody>
      </table>

      <p>
          Silahkan memasukkan dan melakukan verify terhadap unit price untuk tiap-tiap fund diatas sebelum unitize hari ini
          dilakukan.
      </p>

      <p>
          System Email
      </p>

      </body>
      </html>`, `<html>
      <body>
      <p>Kepada Yang Terhormat :</p>

      <p><span th:text="receiver.salutation></span> <span th:text="receiver.name></span></p>

      <p>
          Terlampir kami sampaikan <span th:text="attachmentName></span>
          atas nama <span th:text="receiver.onBehalf></span>
      </p>

      <p>
          Sebagai upaya kami untuk menjaga kerahasiaan data <span th:text="receiver.salutation></span>,
          silahkan gunakan kata sandi untuk membuka dokumen tersebut.
      </p>

      <p>Format kata sandi adalah <b>ddmmyyyyy</b> (contoh: 01011991), dimana:<br/>
      <table>
          <tr>
              <td>dd</td>
              <td>:</td>
              <td>2 (dua) digit tanggal berdiri Perusahaan</td>
          </tr>
          <tr>
              <td>mm</td>
              <td>:</td>
              <td>2 (dua) digit bulan berdiri Perusahaan</td>
          </tr>
          <tr>
              <td>yyyy</td>
              <td>:</td>
              <td>4 (empat) digit tahun berdiri Perusahaan</td>
          </tr>
      </table>

      <p>
          Apabila <span th:text="receiver.salutation></span> memerlukan penjelasan lebih lanjut
          <span th:text="receiver.salutation></span> dapat menghubungi Customer Service kami di:
      </p>

      <table>
          <tr>
              <td>Telp</td>
              <td>:</td>
              <td><span th:text="dplk.telp></span></td>
          </tr>
          <tr>
              <td>Email</td>
              <td>:</td>
              <td style="text-decoration:none;" th:text="dplk.email></td>
          </tr>
      </table>

      <p>
          Demikian kami sampaikan, atas perhatian dan kepercayaan yang
          <span th:text="receiver.salutation></span> berikan, kami mengucapkan terima kasih.
      </p>

      <p>Hormat Kami,<br/><span th:text="dplk.name></span></p>

      <p>
          <span th:text="sender.name></span><br/>Pelaksana Tugas Pengurus <span th:text="dplk.name></span>
      </p>

      </body>
      </html>`]
const attachments = [
  { file: `https://elemence.net/wp-content/uploads/2017/09/LeanStartup-HowAboutLeanLearning-12-12-16_Image.jpg`, name: 'File 1' },
  { file: `https://cdn.slidemodel.com/wp-content/uploads/6656-04-presentation-of-customer-development-process-16x9-1-870x489.jpg`, name: 'File 2' }]

const List = []
const count = 11
for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    subject: '@title(5, 10)',
    template: template[Math.floor(Math.random() * template.length)],
    attachments,
    'isActive|1-10': true,
    createdDate: '@date("yyyy-MM-dd")'

  }))
}

export default [{
  url: '/email-config/list',
  type: 'get',
  response: config => {
    const {
      q,
      page = 1,
      limit = 20
    } = config.query

    const mockList = List.filter(item => {
      if (q && (!item.subject.toLowerCase().includes(q.toLowerCase()))) return false
      return true
    })

    const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

    return {
      code: 20000,
      data: {
        total: mockList.length,
        items: pageList
      }
    }
  }
},

{
  url: '/email-config/detail',
  type: 'get',
  response: config => {
    const {
      id
    } = config.query
    for (const emailConfig of List) {
      if (emailConfig.id === +id) {
        return {
          code: 20000,
          data: emailConfig
        }
      }
    }
  }
},

{
  url: '/email-config/create',
  type: 'post',
  response: _ => {
    return {
      code: 20000,
      data: 'success'
    }
  }
},

{
  url: '/email-config/update',
  type: 'post',
  response: _ => {
    return {
      code: 20000,
      data: 'success'
    }
  }
}
]
