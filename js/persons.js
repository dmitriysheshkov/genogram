const persons = [
    {   
        visible: true,
        surname: 'Фамилия',
        name: 'Имя',
        patronymic: 'Отчество',
        dataOfBirth: '', // new Date(2011, 0, 1, 0, 0, 0, 0), // 1 января 2011, 00:00:00,
        dataOfDeath: '',
        gender: 'male',  // 'male' / 'female'
        imageURL: 'img/unknown.svg',
        pageURL: '',
        gridPositionX: 0,
        gridPositionY: 0,
        connectionLeft: {
            isConnection: false,
            connectionStart: '', // date
            connectionEnd: '', // date
            casual: false,
            married: false,
            divorce: false,
            children: false,
            childrenLeftLineLength: 1,
            childrenRightLineLength: 0
        },
        connectionRight: {
            isConnection: false,
            connectionStart: '', // date
            connectionEnd: '', // date
            casual: false,
            married: false,
            divorce: false,
            children: false,
            childrenLeftLineLength: 0,
            childrenRightLineLength: 0
        }
    },
    {   
        visible: true,
        surname: 'Фамилия',
        name: 'Имя',
        patronymic: 'Отчество',
        dataOfBirth: '', // new Date(2011, 0, 1, 0, 0, 0, 0), // 1 января 2011, 00:00:00,
        dataOfDeath: '',
        gender: 'female',  // 'male' / 'female'
        imageURL: 'img/unknown.svg',
        pageURL: '',
        gridPositionX: 1,
        gridPositionY: 0,
        connectionLeft: {
            isConnection: false,
            connectionStart: '', // date
            connectionEnd: '', // date
            casual: false,
            married: false,
            divorce: false,
            children: false,
            childrenLeftLineLength: 1,
            childrenRightLineLength: 0
        },
        connectionRight: {
            isConnection: false,
            connectionStart: '', // date
            connectionEnd: '', // date
            casual: false,
            married: false,
            divorce: false,
            children: false,
            childrenLeftLineLength: 0,
            childrenRightLineLength: 0
        }
    }
];